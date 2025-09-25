import { MetadataRoute } from 'next';
import { LANGUAGES } from '@/lib/i18n';

const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://threadcraft.mrsamku.me').replace(/\/$/, '');

export default function sitemap(): MetadataRoute.Sitemap {
  return LANGUAGES.map((lang) => ({
    url: `${baseUrl}/${lang.code}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 1.0,
  }));
}
