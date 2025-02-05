import { Metadata, Viewport } from 'next';
import './globals.css'
import { APP_INFO } from '@/lib/constants';

// 獨立導出 viewport 設定
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://text-splitter-101940853523.asia-east1.run.app'),
  applicationName: 'Text Splitter',
  title: {
    template: '%s | Text Splitter',
    default: 'Text Splitter - Social Media Text Splitter Tool'
  },
  description: 'Free tool to split long text into segments for social media platforms like Threads, Twitter/X. Supports Markdown conversion and CJK characters.',
  keywords: ['text splitter', 'thread composer', 'social media', 'threads app', 'twitter', 'markdown', 'CJK', '文字分割', 'テキスト分割'],
  authors: [{ 
    name: APP_INFO.AUTHOR, 
    url: APP_INFO.SOCIAL.X 
  }],
  creator: APP_INFO.AUTHOR,
  publisher: APP_INFO.AUTHOR,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: 'website',
    url: 'https://text-splitter-101940853523.asia-east1.run.app',
    siteName: 'Text Splitter',
    title: 'Text Splitter - Social Media Text Splitter Tool',
    description: 'Free tool to split long text into segments for social media platforms. Supports Markdown and CJK characters.',
    locale: 'en_US',
    alternateLocale: ['zh_TW', 'zh_CN', 'ja_JP'],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@yenchiugu',
    creator: '@yenchiugu',
    title: 'Text Splitter - Social Media Text Splitter Tool',
    description: 'Free tool to split long text into segments for social media platforms. Supports Markdown and CJK characters.',
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',  // 如果有的話
  },
  verification: {
    google: 'your-google-site-verification',  // 如果有的話
  },
  category: 'tool',
  other: {
    'github-repo': APP_INFO.SOCIAL.GITHUB,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-TW">
      <body className="min-h-screen bg-gray-50">
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
          {children}
        </div>
      </body>
    </html>
  )
} 