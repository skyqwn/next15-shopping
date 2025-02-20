import { Injectable } from '@nestjs/common';
import { S3Repository } from 'src/infrastructure/database';

@Injectable()
export class ImagesService {
  constructor(private readonly s3Repository: S3Repository) {}

  async uploadImages(files: Express.Multer.File[]) {
    const uuid = Date.now();
    const uploadedFiles = await this.s3Repository.uploadFiles(files, uuid);

    return uploadedFiles.map((file) => ({
      url: file.url,
      fileName: file.fileName,
      size: file.size,
    }));
  }
}
