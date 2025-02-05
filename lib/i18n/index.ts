import { Language, Translations } from './types';
import { en } from './translations/en';
import { zhTW } from './translations/zh-TW';
import { zhCN } from './translations/zh-CN';
import { ja } from './translations/ja';

export const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'zh-TW', name: '繁體中文' },
  { code: 'zh-CN', name: '简体中文' },
  { code: 'ja', name: '日本語' },
] as const;

const translations: Record<Language, Translations> = {
  'en': en,
  'zh-TW': zhTW,
  'zh-CN': zhCN,
  'ja': ja,
};

export function getTranslation(lang: Language): Translations {
  return translations[lang] || translations['en'];
}

export function getInitialLanguage(): Language {
  // 檢查 URL 參數
  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang') as Language;
    if (langParam && translations[langParam]) {
      return langParam;
    }
  }

  // 檢查瀏覽器語言
  if (typeof navigator !== 'undefined') {
    const browserLang = navigator.language;
    if (browserLang.startsWith('zh')) {
      return browserLang.includes('TW') ? 'zh-TW' : 'zh-CN';
    }
    if (browserLang.startsWith('ja')) {
      return 'ja';
    }
  }

  return 'en';
} 