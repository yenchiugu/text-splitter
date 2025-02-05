'use client'

import { useState, useEffect } from 'react'
import { Language } from '@/lib/i18n/types'
import { getTranslation, getInitialLanguage, LANGUAGES } from '@/lib/i18n'
import TextSplitter from '@/components/TextSplitter'

export default function Home() {
  const [language, setLanguage] = useState<Language>(getInitialLanguage())

  // 當語言改變時更新 URL
  useEffect(() => {
    const url = new URL(window.location.href)
    url.searchParams.set('lang', language)
    window.history.replaceState({}, '', url.toString())
  }, [language])

  const t = getTranslation(language)

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      <div className="container mx-auto p-4">
        {/* 語言選擇 */}
        <div className="flex justify-end mb-4">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as Language)}
            className="px-3 py-1.5 border rounded bg-white shadow-sm hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {LANGUAGES.map(({ code, name }) => (
              <option key={code} value={code}>
                {name}
              </option>
            ))}
          </select>
        </div>

        <h1 className="text-3xl font-bold text-center mb-8">{t.title}</h1>
        
        <TextSplitter 
          language={language} 
          translations={t}
        />
      </div>
    </main>
  )
} 