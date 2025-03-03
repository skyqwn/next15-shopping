import { Injectable } from '@nestjs/common';
import { Effect } from 'effect';
import { BannerModel } from 'src/domain/model/banner.model';

import {
  CreateBannerCriteria,
  UpdateBannerCriteria,
} from '../dtos/criteria/banner';
import { BannerService } from 'src/domain/service/banner.service';

export interface BannerResponse {
  data: BannerModel[];
  total: number;
  hasMore: boolean;
}

@Injectable()
export class BannerFacade {
  constructor(private readonly bannerService: BannerService) {}

  createBanner(
    createBannerCriteria: CreateBannerCriteria,
  ): Effect.Effect<BannerModel, Error> {
    return this.bannerService.createBanner(createBannerCriteria);
  }

  updateBanner(
    id: number,
    updateBannerCriteria: UpdateBannerCriteria,
  ): Effect.Effect<BannerModel, Error> {
    return this.bannerService.updateBanner(id, updateBannerCriteria);
  }

  findAll(): Effect.Effect<BannerModel[], Error> {
    return this.bannerService.findAll();
  }

  getBanners(params: {
    search?: string;
    sort?: string;
    page?: string;
    limit?: string;
  }): Effect.Effect<BannerResponse, Error> {
    return this.bannerService.getBanners(params);
  }

  getBannerById(id: number): Effect.Effect<BannerModel, Error> {
    return this.bannerService.getBannerById(id);
  }

  deleteBanner(id: number): Effect.Effect<void, Error> {
    return this.bannerService.deleteBanner(id);
  }
}
