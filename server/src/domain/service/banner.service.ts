import { Injectable } from '@nestjs/common';
import { pipe, Effect } from 'effect';

import { BannerRepository } from 'src/infrastructure/database/repositories/banner.repository';
import { AppNotFoundException } from '../exceptions';
import { ErrorCodes } from 'src/common/error';
import { CreateBannerCommand, UpdateBannerCommand } from '../dtos';

@Injectable()
export class BannerService {
  constructor(private readonly bannerRepository: BannerRepository) {}

  createBanner(createBannerCommand: CreateBannerCommand) {
    return pipe(
      this.bannerRepository.create({
        title: createBannerCommand.title,
        description: createBannerCommand.description,
        imageUrl: createBannerCommand.imageUrl,
      }),
    );
  }

  updateBanner(id: number, updateBannerCommand: UpdateBannerCommand) {
    return pipe(
      this.bannerRepository.update(id, {
        title: updateBannerCommand.title,
        description: updateBannerCommand.description,
        imageUrl: updateBannerCommand.imageUrl,
        updatedAt: new Date(),
      }),
      Effect.catchAll(() =>
        Effect.fail(new AppNotFoundException(ErrorCodes.BANNER_NOT_FOUND)),
      ),
    );
  }

  findAll() {
    return this.bannerRepository.findAll();
  }

  getBanners(params: {
    search?: string;
    sort?: string;
    page?: string;
    limit?: string;
  }) {
    return this.bannerRepository.findAllWithFilters(params);
  }

  getBannerById(id: number) {
    return pipe(
      this.bannerRepository.findOneBy(id),
      Effect.flatMap((banner) =>
        banner
          ? Effect.succeed(banner)
          : Effect.fail(new AppNotFoundException(ErrorCodes.BANNER_NOT_FOUND)),
      ),
    );
  }

  deleteBanner(id: number) {
    return pipe(
      this.bannerRepository.delete(id),
      Effect.catchAll(() =>
        Effect.fail(new AppNotFoundException(ErrorCodes.BANNER_NOT_FOUND)),
      ),
    );
  }
}
