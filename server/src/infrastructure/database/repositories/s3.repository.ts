import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { getUniqueFileName } from 'src/common/utils';

@Injectable()
export class S3Repository {
  private readonly s3Client: S3Client;

  constructor(private readonly configService: ConfigService) {
    this.s3Client = new S3Client({
      region: this.configService.get('AWS_BUCKET_REGION'),
      credentials: {
        accessKeyId: this.configService.get('S3_ACCESS_KEY_ID')!,
        secretAccessKey: this.configService.get('S3_SECRET_ACCESS_KEY')!,
      },
    });
  }

  async uploadFiles(files: Express.Multer.File[], uuid: number) {
    const uploadPromises = files.map((file) => this.uploadFile(file, uuid));
    await Promise.all(uploadPromises);

    return files.map((file) => {
      const fileName = getUniqueFileName(file, uuid);
      return {
        url: this.generateFileUrl(fileName),
        fileName,
        size: file.size,
      };
    });
  }

  private async uploadFile(file: Express.Multer.File, uuid: number) {
    const fileName = getUniqueFileName(file, uuid);
    const command = new PutObjectCommand({
      Bucket: this.configService.get('AWS_BUCKET_NAME'),
      Key: `original/${fileName}`,
      Body: file.buffer,
    });

    return this.s3Client.send(command);
  }

  private generateFileUrl(fileName: string): string {
    return `https://${this.configService.get('AWS_BUCKET_NAME')}.s3.${this.configService.get('AWS_BUCKET_REGION')}.amazonaws.com/original/${fileName}`;
  }
}
