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
        .toBuffer();

      file.buffer = resizeBuffer;
      file.size = resizeBuffer.length;
    }
    return file;
  }
}
