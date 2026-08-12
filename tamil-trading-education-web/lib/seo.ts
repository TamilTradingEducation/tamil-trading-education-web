import type { Metadata } from "next";
import { site } from "@/lib/data";

interface BuildMetaArgs {
  title: string;
  description: string;
  path: string;
  image?: string;
}

export function buildMetadata({ title, description, path, image }: BuildMetaArgs): Metadata {
  const url = `${site.domain}${path}`;
  const fullTitle = path === "/" ? title : `${title} | ${site.name}`;
  return {
    title: fullTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: site.name,
      type: "website",
      images: image ? [{ url: image, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: image ? [image] : undefined,
    },
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: site.name,
    description:
      "Forex Trading Education & Trading Community offering structured courses, live market analysis and mentorship.",
    url: site.domain,
    logo: `${site.domain}/logo.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${site.address.line1}, ${site.address.line2}, ${site.address.line3}`,
      addressLocality: "Kadayam Perumpattu",
      addressRegion: site.address.state,
      postalCode: site.address.pincode,
      addressCountry: "IN",
    },
    telephone: site.phoneRaw,
    ...(site.email ? { email: site.email } : {}),
    sameAs: [site.instagram, site.youtube, site.telegram, site.tradingview, site.x],
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function courseSchema(course: { title: string; description: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.description,
    provider: {
      "@type": "Organization",
      name: site.name,
      sameAs: site.domain,
    },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${site.domain}${item.path}`,
    })),
  };
}
