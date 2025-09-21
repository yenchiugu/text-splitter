import { MetadataRoute } from 'next';
import { LANGUAGES } from '@/lib/i18n';

export default function sitemap(): MetadataRoute.Sitemap {
  // 使用相對 URL，讓 Next.js 自動處理完整網址
  return LANGUAGES.map((lang) => ({
    url: `/${lang.code}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 1.0,
  }));
}
