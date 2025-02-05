import './globals.css'

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