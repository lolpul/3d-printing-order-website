import type { Metadata } from "next";
import type { SiteSettingsView } from "@/lib/settings";

export function absoluteUrl(settings: SiteSettingsView, path = "/") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${settings.siteUrl}${normalizedPath}`;
}

export function pageMetadata(settings: SiteSettingsView, options: {
  title: string;
  description: string;
  path?: string;
  noIndex?: boolean;
}): Metadata {
  const url = absoluteUrl(settings, options.path ?? "/");
  return {
    title: options.title,
    description: options.description,
    alternates: { canonical: url },
    robots: options.noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title: options.title,
      description: options.description,
      url,
      siteName: settings.siteName,
      locale: "ru_RU",
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: options.title,
      description: options.description
    }
  };
}

export function localBusinessJsonLd(settings: SiteSettingsView) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: settings.siteName,
    url: settings.siteUrl,
    areaServed: [
      { "@type": "City", name: settings.city },
      { "@type": "AdministrativeArea", name: settings.region },
      { "@type": "Country", name: "Россия" }
    ],
    email: settings.contactEmail || undefined,
    telephone: settings.phoneNumber || undefined,
    address: {
      "@type": "PostalAddress",
      addressLocality: settings.city,
      addressRegion: settings.region,
      addressCountry: "RU"
    }
  };
}

export function websiteJsonLd(settings: SiteSettingsView) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: settings.siteName,
    url: settings.siteUrl,
    inLanguage: "ru-RU"
  };
}

export function breadcrumbsJsonLd(settings: SiteSettingsView, items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(settings, item.path)
    }))
  };
}

export function faqJsonLd(items: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer }
    }))
  };
}
