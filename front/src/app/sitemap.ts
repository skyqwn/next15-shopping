import type { MetadataRoute } from "next";
import { getVariants } from "@/hooks/queries/product-variant/useVariantQuery";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.cicardi.store";

  const staticPages = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      priority: 1.0,
    },
    {
      url: `${baseUrl}/shop`,
      lastModified: new Date(),
      priority: 0.8,
    },
  ];

  let productPages: MetadataRoute.Sitemap = [];
  try {
    const variants = await getVariants();
    if (variants && variants.result) {
      productPages = variants.result.map((variant) => ({
        url: `${baseUrl}/shop/${variant.id}`,
        lastModified: new Date(),
        priority: 0.5,
      }));
    }
  } catch (error) {
    console.error("Sitemap 생성 중 variants 가져오기 실패:", error);
    productPages = [
      {
        url: `${baseUrl}/shop/91`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.5,
      },
      {
        url: `${baseUrl}/shop/90`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.5,
      },
      {
        url: `${baseUrl}/shop/88`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.5,
      },
    ];
  }

  return [...staticPages, ...productPages];
}
