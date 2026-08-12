import type { MetadataRoute } from "next";
import { site, blogPosts } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/courses",
    "/market-analysis",
    "/vip-community",
    "/broker-assistance",
    "/testimonials",
    "/blog",
    "/faq",
    "/contact",
    "/privacy-policy",
    "/terms",
    "/risk-disclaimer",
  ].map((path) => ({
    url: `${site.domain}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const blogRoutes = blogPosts.map((post) => ({
    url: `${site.domain}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...blogRoutes];
}
