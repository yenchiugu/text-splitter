import { redirect } from 'next/navigation';
import { getInitialLanguage } from '@/lib/i18n';

// 版本和作者常數
// export const VERSION = '1.0.0';  // 移除這行
const AUTHOR = 'Sam Ku';

export default async function Page() {
  // 獲取初始語言並重定向
  const initialLang = await getInitialLanguage();
  redirect(`/${initialLang}`);
}

// 將版本和作者資訊匯出，讓其他組件可以使用
export { AUTHOR }; 