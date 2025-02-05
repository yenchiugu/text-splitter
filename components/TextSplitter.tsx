'use client';

import { useState, useEffect } from 'react';
import { Language, Translations } from '@/lib/i18n/types';
import { getTranslation, getInitialLanguage, LANGUAGES } from '@/lib/i18n';
import SplitResult from './SplitResult';

// Maximum character limit for Threads platform
const THREADS_MAX_LENGTH = 500;

// Types for length settings
type LengthType = 'threads' | 'custom';

interface LengthSetting {
  type: LengthType;
  customValue?: number;
}

const MAX_TOTAL = 500; // 每段總長度上限（包含前綴）

// Define bracket pairs for text processing
// These pairs will be used to ensure we don't split text within brackets
const BRACKETS_PAIRS: [string, string][] = [
  ['「', '」'], // Japanese/Chinese quotation marks
  ['（', '）'], // Full-width parentheses
  ['《', '》'], // Chinese book title marks
  ['[', ']'],  // Square brackets
  ['(', ')'],  // Regular parentheses
  ['{', '}']   // Curly braces
];

/**
 * Checks if a given position in text is inside any pair of brackets
 * Uses a stack-based algorithm to handle nested brackets
 * 
 * @param text - The input text to check
 * @param pos - The position to check
 * @returns boolean - True if position is inside brackets, false otherwise
 */
function isInsideBrackets(text: string, pos: number): boolean {
  const stack: string[] = [];
  for (let i = 0; i <= pos; i++) {
    const char = text[i];
    for (const [open, close] of BRACKETS_PAIRS) {
      if (char === open) {
        stack.push(open);
      } else if (char === close) {
        if (stack.length > 0 && stack[stack.length - 1] === open) {
          stack.pop();
        }
      }
    }
  }
  return stack.length > 0;
}

/**
 * Finds a safe position to cut the text by looking backwards from allowedLen
 * Prioritizes line breaks, Chinese periods, and English periods
 * Ensures the cut position is not inside brackets
 * 
 * @param text - The text to analyze
 * @param allowedLen - Maximum allowed length for the segment
 * @returns number - The safe position to cut the text
 */
function findSafeCut(text: string, allowedLen: number): number {
  if (text.length <= allowedLen) return text.length;

  for (let i = allowedLen; i > 0; i--) {
    const char = text[i - 1];
    if ((char === '\n' || char === '。' || char === '.') && !isInsideBrackets(text, i - 1)) {
      return i;
    }
  }
  // If no suitable cut point is found, cut at allowedLen
  return allowedLen;
}

/**
 * Splits text into segments based on allowed length while preserving sentence integrity
 * 
 * @param text - The text to split
 * @param allowedLen - Maximum length for each segment (excluding prefix)
 * @returns string[] - Array of text segments
 */
function splitSegments(text: string, allowedLen: number): string[] {
  const segments: string[] = [];
  let remaining = text.trim();

  while (remaining.length > 0) {
    if (remaining.length <= allowedLen) {
      segments.push(remaining);
      break;
    }
    const cutPos = findSafeCut(remaining, allowedLen);
    const pos = cutPos > 0 ? cutPos : allowedLen;
    segments.push(remaining.substring(0, pos).trim());
    remaining = remaining.substring(pos).trim();
  }
  return segments;
}

/**
 * Calculates the length of the prefix "(n/m) " based on total segments
 * Formula: 4 + 2 * (number of digits in total)
 * Example: for 10 segments, prefix length = 4 + 2 * 2 = 8 ("(10/10) ")
 * 
 * @param total - Total number of segments
 * @returns number - Length of the prefix
 */
function calcPrefixLength(total: number): number {
  const digits = total.toString().length;
  return 4 + 2 * digits;
}

/**
 * Main text splitting function
 * 1. If text length <= maxLength, return text as is
 * 2. Initially assume prefix length of 6 (for single-digit segments)
 * 3. Split text and recalculate prefix length based on actual segments
 * 4. If needed, resplit with adjusted allowedLen
 * 5. Add "(n/m) " prefix to each segment if multiple segments
 * 
 * @param text - The input text to split
 * @param maxLength - Maximum length for each segment (including prefix)
 * @returns string[] - Array of formatted text segments
 */
function splitArticle(text: string, maxLength: number): string[] {
  if (text.length <= maxLength) return [text];

  // 初步假設前綴長度為 6（適用於 1~9 段），故 allowedLen = 500 - 6
  let prefixLength = 6;
  let allowedLen = maxLength - prefixLength;
  let segments = splitSegments(text, allowedLen);

  // 根據實際段數，重新計算前綴長度
  const newPrefixLength = calcPrefixLength(segments.length);
  if (newPrefixLength !== prefixLength) {
    prefixLength = newPrefixLength;
    allowedLen = maxLength - prefixLength;
    segments = splitSegments(text, allowedLen);
  }

  // 最後若有多段，為每段加入前綴；若只有一段，則直接使用原文
  if (segments.length > 1) {
    segments = segments.map((seg, idx) => `(${idx + 1}/${segments.length}) ${seg}`);
  }
  return segments;
}

interface TextSplitterProps {
  language: Language;
  translations: Translations;
}

/**
 * TextSplitter Component
 * A component that splits long text into segments while preserving:
 * - Sentence integrity
 * - Bracket pairs
 * - Maximum length constraints
 * 
 * Features:
 * - Configurable maximum length (Threads or custom)
 * - Multilingual support
 * - Copy to clipboard functionality
 * - Character count display
 */
export default function TextSplitter({ language, translations: t }: TextSplitterProps) {
  const [inputText, setInputText] = useState('');
  const [segments, setSegments] = useState<string[]>([]);
  const [lengthSetting, setLengthSetting] = useState<LengthSetting>({
    type: 'threads'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const maxLength = lengthSetting.type === 'threads' 
      ? THREADS_MAX_LENGTH 
      : lengthSetting.customValue || THREADS_MAX_LENGTH;
    
    const segs = splitArticle(inputText, maxLength);
    setSegments(segs);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{t.title}</h1>

      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        {/* 長度設定區塊 */}
        <div className="space-y-2">
          <div className="text-sm font-medium text-gray-700">{t.lengthSettings.title}</div>
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                checked={lengthSetting.type === 'threads'}
                onChange={() => setLengthSetting({ type: 'threads' })}
                className="form-radio"
              />
              <span>{t.lengthSettings.threads}</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                checked={lengthSetting.type === 'custom'}
                onChange={() => setLengthSetting({ 
                  type: 'custom', 
                  customValue: lengthSetting.customValue || THREADS_MAX_LENGTH 
                })}
                className="form-radio"
              />
              <span>{t.lengthSettings.custom}</span>
            </label>
            {lengthSetting.type === 'custom' && (
              <input
                type="number"
                value={lengthSetting.customValue || THREADS_MAX_LENGTH}
                onChange={(e) => setLengthSetting({
                  type: 'custom',
                  customValue: Math.max(1, parseInt(e.target.value) || THREADS_MAX_LENGTH)
                })}
                className="ml-6 w-24 px-2 py-1 border rounded"
                min="1"
              />
            )}
          </div>
        </div>

        {/* 文字輸入區域 */}
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="w-full h-48 p-2 border rounded"
          placeholder={t.input.placeholder}
        />
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {t.buttons.split}
        </button>
      </form>

      {/* 結果顯示區域 */}
      {segments.length > 0 && (
        <div className="space-y-4">
          {segments.map((seg, idx) => (
            <SplitResult 
              key={idx} 
              text={seg} 
              translations={t}
            />
          ))}
        </div>
      )}
    </div>
  );
}
