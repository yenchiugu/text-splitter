import { Language } from '@/lib/i18n/types';
import { getTranslation, LANGUAGES } from '@/lib/i18n';
import TextSplitter from '@/components/TextSplitter';
import Link from 'next/link';
import { APP_INFO } from '@/lib/constants';
import { Metadata } from 'next';

interface PageProps {
  params: Promise<{ lang: Language }>;
}

// 動態產生 metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const t = await getTranslation(lang);
  
  return {
    title: t.title,
    description: t.meta?.description || 'Split your text into segments for social media platforms',
    openGraph: {
      title: t.title,
      description: t.meta?.description || 'Split your text into segments for social media platforms',
    },
  };
}

export default async function Home({ params }: PageProps) {
  // 等待 params
  const { lang } = await params;
  
  // 獲取翻譯
  const t = await getTranslation(lang);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        {/* 標題區域 */}
        <div className="py-6 mb-6 border-b space-y-4">
          {/* 標題和版本資訊 */}
          <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center sm:space-x-8">
              <h1 className="text-2xl font-bold">{t.title}</h1>
              <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:items-center sm:divide-x text-sm text-gray-500">
                <div className="sm:pr-4">{t.footer.version}: {APP_INFO.VERSION}</div>
                <div className="sm:px-4">{t.footer.author}: {APP_INFO.AUTHOR}</div>
                <div className="flex space-x-3 sm:pl-4">
                  <a 
                    href={`mailto:${APP_INFO.EMAIL}`}
                    className="text-gray-500 hover:text-gray-700"
                    title={t.footer.email}
                  >
                    ✉️
                  </a>
                  <a 
                    href={APP_INFO.SOCIAL.THREADS}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-gray-700"
                    title={t.footer.social.threads}
                  >
                    📱
                  </a>
                  <a 
                    href={APP_INFO.SOCIAL.X}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-gray-700"
                    title={t.footer.social.x}
                  >
                    𝕏
                  </a>
                  <a 
                    href={APP_INFO.SOCIAL.GITHUB}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-gray-700"
                    title="GitHub"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* 語言切換 - 移到新的一行 */}
          <div className="flex items-center justify-end -mb-2 mt-1">
            <div className="inline-flex rounded-md shadow-sm" role="group">
              {LANGUAGES.map((language) => (
                <Link
                  key={language.code}
                  href={`/${language.code}`}
                  className={`
                    px-3 py-1.5 text-sm font-medium
                    ${language.code === lang
                      ? 'bg-blue-500 text-white hover:bg-blue-600'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                    }
                    ${LANGUAGES.indexOf(language) === 0 ? 'rounded-l-md' : ''}
                    ${LANGUAGES.indexOf(language) === LANGUAGES.length - 1 ? 'rounded-r-md' : ''}
                    border border-gray-200
                    ${LANGUAGES.indexOf(language) !== 0 ? '-ml-px' : ''}
                    transition-colors
                  `}
                >
                  {language.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* 主要內容 */}
        <TextSplitter translations={t} />
      </div>
    </div>
  );
}

// 產生靜態頁面的設定
export function generateStaticParams() {
  return LANGUAGES.map((lang) => ({
    lang: lang.code,
  }));
} 