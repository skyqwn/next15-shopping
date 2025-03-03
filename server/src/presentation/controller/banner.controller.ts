import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Effect, pipe } from 'effect';
import { BannerFacade, BannerResponse } from 'src/application/facades';

import { IsPublic } from 'src/common/decorators/is-public.decorator';
import {
  CreateBannerDto,
  PatchBannerDto,
} from '../dtos/banner/request/create-banner-request.dto';

@Controller('banners')
export class BannerController {
  constructor(private readonly bannerFacade: BannerFacade) {}

  @Post()
  createBanner(@Body() createBannerDto: CreateBannerDto) {
    return pipe(
      this.bannerFacade.createBanner(createBannerDto),
      Effect.map((banner) => ({
        success: true,
        result: banner,
        message: null,
      })),
      Effect.runPromise,
    );
  }

  @Get()
  @IsPublic()
  findAll() {
    return pipe(
      this.bannerFacade.findAll(),
      Effect.map((banners) => ({
        success: true,
        result: banners,
        message: banners.length === 0 ? '등록된 배너가 없습니다' : null,
      })),
      Effect.runPromise,
    );
  }

  @Get('/filter')
  getBanners(
    @Query('q') search?: string,
    @Query('sort') sort?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return pipe(
      this.bannerFacade.getBanners({ search, sort, page, limit }),
      Effect.map((result: BannerResponse) => ({
        success: true,
        result,
        message: result.data.length === 0 ? '등록된 배너가 없습니다' : null,
      })),
      Effect.runPromise,
    );
  }

  @IsPublic()
  @Get(':id')
  getBannerById(@Param('id') id: string) {
    return pipe(
      this.bannerFacade.getBannerById(parseInt(id)),
      Effect.map((banner) => ({
        success: true,
        result: banner,
        message: null,
      })),
      Effect.runPromise,
    );
  }

  @Patch(':id')
  updateBanner(
    @Param('id') id: string,
    @Body() updateBannerDto: PatchBannerDto,
  ) {
    return pipe(
      this.bannerFacade.updateBanner(parseInt(id), updateBannerDto),
      Effect.map((banner) => ({
        success: true,
        result: banner,
        message: '배너가 성공적으로 업데이트 되었습니다',
      })),
      Effect.runPromise,
    );
  }

  @Delete(':id')
  deleteBanner(@Param('id') id: string) {
    return pipe(
      this.bannerFacade.deleteBanner(parseInt(id)),
      Effect.map(() => ({
        success: true,
        result: null,
        message: '배너가 성공적으로 삭제되었습니다',
      })),
      Effect.runPromise,
    );
  }
}
