import {
  Controller,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ImagesFacade } from 'src/application/facades';
import { ResizeImagePipe } from 'src/common/pipes/resize-image.pipe';

@Controller('/images')
@UseGuards(AuthGuard('jwt'))
export class ImagesController {
  constructor(private readonly imagesFacade: ImagesFacade) {}

  @UseInterceptors(
    FilesInterceptor('images', 5, {
      limits: { fileSize: 20 * 1024 * 1024 },
    }),
  )
  @Post('/')
  async uploadImages(
    @UploadedFiles(ResizeImagePipe)
    files: Array<Express.Multer.File & { blurThumb?: string }>,
  ) {
    console.log('files', files);
    const result = await this.imagesFacade.uploadImages(files);
    return {
      success: true,
      result,
    };
  }
}
