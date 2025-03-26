import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/shop/", "/shop/[id]"],
      disallow: ["/admin/", "/api/", "/my"],
    },
    sitemap: "https://www.cicardi.store/sitemap.xml",
  };
}
