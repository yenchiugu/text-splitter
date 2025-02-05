'use client'

import { useState } from 'react'
import { Translations } from '@/lib/i18n/types'

/**
 * 單一分段結果組件，包含「複製到剪貼簿」按鈕
 */
interface SplitResultProps {
    text: string;
    translations: Translations;
  }
  
  export default function SplitResult({ text, translations: t }: SplitResultProps) {
    const [copied, setCopied] = useState(false);
  
    const copyToClipboard = async () => {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    };
  
    return (
      <div className="p-4 border rounded bg-gray-50">
        <div className="flex justify-between items-start gap-4">
          <p className="flex-1 whitespace-pre-wrap">{text}</p>
          <button
            onClick={copyToClipboard}
            className={`px-3 py-1 rounded ${copied ? 'bg-green-500' : 'bg-blue-500'} text-white`}
          >
            {copied ? t.buttons.copied : t.buttons.copy}
          </button>
        </div>
        <div className="mt-2 text-sm text-gray-500">
          {t.stats.charCount}{text.length}
        </div>
      </div>
    );
  }