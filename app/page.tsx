import { redirect } from 'next/navigation';
import { getInitialLanguage } from '@/lib/i18n';

// 版本和作者常數
const VERSION = '1.0.0';
const AUTHOR = 'Sam Ku';

export default function RootPage() {
  // 取得使用者的預設語言並重導向
  const lang = getInitialLanguage();
  redirect(`/${lang}`);
}

// 將版本和作者資訊匯出，讓其他組件可以使用
export { VERSION, AUTHOR }; 