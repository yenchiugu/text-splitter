import { Metadata } from 'next';
import './globals.css'
import { APP_INFO } from '@/lib/constants';

export const metadata: Metadata = {
  metadataBase: new URL('https://text-splitter-101940853523.asia-east1.run.app'),
  applicationName: 'Text Splitter',
  authors: [{ 
    name: APP_INFO.AUTHOR, 
    url: APP_INFO.SOCIAL.X 
  }],
  creator: APP_INFO.AUTHOR,
  publisher: APP_INFO.AUTHOR,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/favicon.ico',
    // 如果有其他尺寸的圖示，也可以加在這裡
  },
  openGraph: {
    type: 'website',
    url: 'https://text-splitter-101940853523.asia-east1.run.app',
    siteName: 'Text Splitter',
  },
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