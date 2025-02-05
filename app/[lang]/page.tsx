import { Translations, Language } from '@/lib/i18n/types';
import { getTranslation, LANGUAGES } from '@/lib/i18n';
import TextSplitter from '@/components/TextSplitter';
import { VERSION, AUTHOR } from '../page';
import Link from 'next/link';

// 作者資訊常數
const AUTHOR_INFO = {
  name: 'Sam Ku',
  email: 'yenchiugu@gmail.com',
  threads: 'https://www.threads.net/@yenchiugu',
  x: 'https://x.com/yenchiugu'
};

export default async function Home({ params: { lang } }: { params: { lang: Language } }) {
  const t: Translations = getTranslation(lang);

  return (
    <main className="container mx-auto px-4">
      {/* 標題區域 */}
      <div className="py-6 mb-6 border-b">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* 左側：標題和版本資訊 */}
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-bold">{t.title}</h1>
            <div className="text-sm text-gray-500 flex items-center divide-x">
              <div className="pr-4">{t.footer.version}: {VERSION}</div>
              <div className="px-4">
                {t.footer.author}: {AUTHOR_INFO.name}
              </div>
              <div className="pl-4 space-x-3">
                <a 
                  href={`mailto:${AUTHOR_INFO.email}`}
                  className="text-gray-500 hover:text-gray-700"
                  title={t.footer.email}
                >
                  ✉️
                </a>
                <a 
                  href={AUTHOR_INFO.threads}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-gray-700"
                  title={t.footer.social.threads}
                >
                  📱
                </a>
                <a 
                  href={AUTHOR_INFO.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-gray-700"
                  title={t.footer.social.x}
                >
                  𝕏
                </a>
              </div>
            </div>
          </div>

          {/* 右側：語言切換 */}
          <div className="flex items-center space-x-2">
            {LANGUAGES.map(({ code, name }, index) => (
              <div key={code} className="flex items-center">
                {index > 0 && <span className="text-gray-300 mx-2">|</span>}
                <Link
                  href={`/${code}`}
                  className={`px-2 py-1 rounded hover:bg-gray-100 ${
                    code === lang 
                      ? 'text-blue-600 font-medium' 
                      : 'text-gray-600'
                  }`}
                >
                  {name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      <TextSplitter language={lang} translations={t} />
    </main>
  );
}

// 產生靜態頁面的設定
export function generateStaticParams() {
  return [
    { lang: 'en' },
    { lang: 'zh-TW' },
    { lang: 'zh-CN' },
    { lang: 'ja' },
  ];
} 