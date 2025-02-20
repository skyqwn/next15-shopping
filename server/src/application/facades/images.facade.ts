import { Injectable } from '@nestjs/common';
import { ImagesService } from 'src/domain/service/images.service';

@Injectable()
export class ImagesFacade {
  constructor(private readonly imagesService: ImagesService) {}

  async uploadImages(files: Express.Multer.File[]) {
    return this.imagesService.uploadImages(files);
  }
}
