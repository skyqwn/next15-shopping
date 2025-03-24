import { Injectable, PipeTransform } from '@nestjs/common';
import * as sharp from 'sharp';

const MAX_LENGTH = 800;

@Injectable()
export class ResizeImagePipe implements PipeTransform {
  async transform(files: Express.Multer.File[] | Express.Multer.File) {
    if (Array.isArray(files)) {
      return Promise.all(files.map((file) => this.resizeImage(file)));
    } else {
      return this.resizeImage(files);
    }
  }

  private async resizeImage(file: Express.Multer.File) {
    const metadata = await sharp(file.buffer).metadata();

    if (
      metadata.width &&
      metadata.height &&
      (metadata.width > MAX_LENGTH || metadata.height > MAX_LENGTH)
    ) {
      const resizeOptions =
        metadata.width > metadata.height
          ? { width: MAX_LENGTH }
          : { height: MAX_LENGTH };

      file.buffer = await sharp(file.buffer)
        .resize(resizeOptions)
        .webp({ quality: 60 })
        .toBuffer();
      file.size = file.buffer.length;
    }

    const plaiceholder = await import('plaiceholder');
    const { base64 } = await plaiceholder.getPlaiceholder(file.buffer);

    return {
      ...file,
      blurThumb: base64,
    };
  }
}
