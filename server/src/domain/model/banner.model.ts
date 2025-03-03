import { BannerSelectType } from 'src/infrastructure/drizzle/schema/banner.schema';

export class BannerModel {
  constructor(
    public id: number,
    public title: string,
    public description: string | null,
    public imageUrl: string,
    public createdAt: Date | null,
    public updatedAt: Date | null,
  ) {}

  static from(data: BannerSelectType): BannerModel {
    return new BannerModel(
      data.id,
      data.title,
      data.description,
      data.imageUrl,
      data.createdAt,
      data.updatedAt,
    );
  }
}
