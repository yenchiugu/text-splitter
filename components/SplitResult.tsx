'use client'

import { useState } from 'react'
import { Translations } from '@/lib/i18n/types'

/**
 * 單一分段結果組件，包含「複製到剪貼簿」按鈕
 */
interface SplitResultProps {
    text: string;
    translations: Translations;
    countCJKAsTwo: boolean;
  }
  
  export default function SplitResult({ text, translations: t, countCJKAsTwo }: SplitResultProps) {
    const [copied, setCopied] = useState(false);
    const [copyCount, setCopyCount] = useState(0);
  
    // 檢查是否為 CJK 字元的函數
    function isCJKChar(char: string): boolean {
      return /[\u4e00-\u9fff\u3040-\u309f\u30a0-\u30ff]/.test(char);
    }
  
    // 計算文字長度的函數
    function calculateLength(text: string): number {
      if (!countCJKAsTwo) return text.length;
      
      return text.split('').reduce((acc, char) => {
        return acc + (isCJKChar(char) ? 2 : 1);
      }, 0);
    }
  
    const copyToClipboard = async () => {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setCopyCount(prev => prev + 1);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    };
  
    return (
      <div className="p-4 border rounded bg-gray-50">
        <div className="flex justify-between items-start gap-4">
          <p className="flex-1 whitespace-pre-wrap break-words">{text}</p>
          <button
            onClick={copyToClipboard}
            className={`px-3 py-1 rounded ${copied ? 'bg-green-500' : copyCount > 0 ? 'bg-purple-500' : 'bg-blue-500'} text-white shrink-0`}
          >
            {copied ? t.buttons.copied : t.buttons.copy}
          </button>
        </div>
        <div className="mt-2 text-sm text-gray-500 flex justify-between">
          <span>{t.stats.charCount}{calculateLength(text)}</span>
          {copyCount > 0 && (
            <span>{t.stats.copyCount.replace('{count}', copyCount.toString())}</span>
          )}
        </div>
      </div>
    );
  }