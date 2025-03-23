import { Injectable, PipeTransform } from '@nestjs/common';
import * as sharp from 'sharp';

const MAX_LENGTH = 800;

@Injectable()
export class ResizeImagePipe implements PipeTransform {
  async transform(files: Express.Multer.File[] | Express.Multer.File) {
    if (Array.isArray(files)) {
      return await Promise.all(files.map((file) => this.resizeImage(file)));
    } else {
      return await this.resizeImage(files);
    }
  }

  private async resizeImage(file: Express.Multer.File) {
    const metadata = await sharp(file.buffer).metadata();
    let resizeBuffer = file.buffer;

    if (
      metadata.width &&
      metadata.height &&
      (metadata.width > MAX_LENGTH || metadata.height > MAX_LENGTH)
    ) {
      const resizeOptions =
        metadata.width > metadata.height
          ? { width: MAX_LENGTH }
          : { height: MAX_LENGTH };

      const resizeBuffer = await sharp(file.buffer)
        .resize(resizeOptions)
        .webp({ quality: 80 })
        .toBuffer();

      file.buffer = resizeBuffer;
      file.size = resizeBuffer.length;
    }
    const { getPlaiceholder } = await import('plaiceholder');
    const { base64 } = await getPlaiceholder(resizeBuffer);

    return {
      ...file,
      blurThumb: base64,
    };
  }
}
