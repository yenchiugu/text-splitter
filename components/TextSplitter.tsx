'use client';

import { useState } from 'react';
import { 
  MarkdownSettings, 
  PageNumberSettings, 
  WidthSetting, 
  Translations,
  SymbolPair
} from '@/lib/i18n/types';
import SplitResult from './SplitResult';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import EmojiPicker from 'emoji-picker-react';
import { convertToSimplified, convertToTraditional } from '@/lib/utils/chineseConverter';

// Maximum character limit for Threads platform
const THREADS_MAX_LENGTH = 500;

// Types for length settings
type LengthType = 'threads' | 'custom' | 'none';

interface LengthSetting {
  type: LengthType;
  customValue?: number;
}

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

// 修改 BULLET_OPTIONS 的順序，將 🔹 放在第一位
const BULLET_OPTIONS = ['🔹', '•', '▪', '▫', '‣', '►', '▸', '➢', '➣'];

const CIRCLED_NUMBERS = ['①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧', '⑨', '⑩'];
const PARENTHESIZED_NUMBERS = ['⑴', '⑵', '⑶', '⑷', '⑸', '⑹', '⑺', '⑻', '⑼', '⑽'];

// 新增常數
const THREADS_WIDTH = 542.4;

const DEFAULT_MARKDOWN_SETTINGS: MarkdownSettings = {
  headings: {
    h1: { left: '【', right: '】', useLeft: false },
    h2: { left: '《', right: '》', useLeft: false },
    h3: { left: '『', right: '』', useLeft: false },
  },
  emphasis: {
    bold: { left: '「', right: '」', useLeft: false },
    italic: { left: '`', right: '`', useLeft: true },
  },
  list: {
    bullet: '🔹',  // 預設使用 🔹
    numberStyle: 'circled',  // 預設使用圓圈數字
  },
  headingNewline: true,
};

const DEFAULT_PAGE_NUMBER_SETTINGS: PageNumberSettings = {
  enabled: false,
  format: 'Page (n/m)',
  position: 'bottom',
  newlineCount: 2, // 預設兩個換行符號
};

interface TextSplitterProps {
  translations: Translations;
}

// 新增強調設定的 key 型別
type HeadingKey = 'h1' | 'h2' | 'h3';
type EmphasisKey = 'bold' | 'italic';

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
export default function TextSplitter({ translations: t }: TextSplitterProps) {
  const [inputText, setInputText] = useState('');
  const [segments, setSegments] = useState<string[]>([]);
  const [lengthSetting, setLengthSetting] = useState<LengthSetting>({
    type: 'threads'
  });
  const [removeReferences, setRemoveReferences] = useState(true);
  const [convertMarkdown, setConvertMarkdown] = useState(true);
  const [markdownSettings, setMarkdownSettings] = useState<MarkdownSettings>(DEFAULT_MARKDOWN_SETTINGS);
  const [pageNumberSettings, setPageNumberSettings] = useState<PageNumberSettings>(DEFAULT_PAGE_NUMBER_SETTINGS);
  const [widthSetting, setWidthSetting] = useState<WidthSetting>({
    type: 'threads'
  });
  const [countCJKAsTwo, setCountCJKAsTwo] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [chineseConversion, setChineseConversion] = useState<'none' | 'to-tw' | 'to-cn'>('none');

  // 計算當前寬度
  const currentWidth = widthSetting.type === 'threads' 
    ? THREADS_WIDTH 
    : widthSetting.customValue || THREADS_WIDTH;

  // 移除參考連結的函數
  const removeReferenceLinks = (text: string): string => {
    if (!removeReferences) return text;
    let result = text;
    // 移除格式為 ([文字](URL)) 的參考連結
    result = result.replace(/\(\[[^\]]*\]\([^)]*\)\)/g, '');
    // 移除獨立的 URL 行（換行 + URL + 換行）
    result = result.replace(/\n([a-zA-Z0-9][a-zA-Z0-9.-]*\.[a-zA-Z]{2,})\n/g, '');
    return result;
  };

  // Markdown 轉換函數
  const convertMarkdownToEmoji = (text: string): string => {
    if (!convertMarkdown) return text;
    let result = text;
    
    // 處理標題
    const newline = markdownSettings.headingNewline ? '\n' : '';
    const { headings } = markdownSettings;
    
    // 修正標題的正則表達式
    result = result.replace(/^# (.+)$/gm, (_, content) => 
      headings.h1.useLeft
        ? `${headings.h1.left}${content}${headings.h1.left}${newline}`
        : `${headings.h1.left}${content}${headings.h1.right}${newline}`
    );

    result = result.replace(/^## (.+)$/gm, (_, content) => 
      headings.h2.useLeft
        ? `${headings.h2.left}${content}${headings.h2.left}${newline}`
        : `${headings.h2.left}${content}${headings.h2.right}${newline}`
    );

    result = result.replace(/^### (.+)$/gm, (_, content) => 
      headings.h3.useLeft
        ? `${headings.h3.left}${content}${headings.h3.left}${newline}`
        : `${headings.h3.left}${content}${headings.h3.right}${newline}`
    );
    
    // 處理粗體和斜體
    const { emphasis } = markdownSettings;
    
    // 粗體
    const boldPattern = /\*\*(.+?)\*\*/g;
    result = result.replace(boldPattern, (_, content) => 
      emphasis.bold.useLeft
        ? `${emphasis.bold.left}${content}${emphasis.bold.left}`
        : `${emphasis.bold.left}${content}${emphasis.bold.right}`
    );
    
    // 斜體
    const italicPattern = /\*(.+?)\*/g;
    result = result.replace(italicPattern, (_, content) =>
      emphasis.italic.useLeft
        ? `${emphasis.italic.left}${content}${emphasis.italic.left}`
        : `${emphasis.italic.left}${content}${emphasis.italic.right}`
    );
    
    // 處理列表
    const { list } = markdownSettings;
    
    // 無序列表（支援階層）
    const bulletSymbol = list.bullet === 'custom' && list.customBullet 
      ? list.customBullet 
      : list.bullet;

    // 只匹配行首的列表項目，避免匹配表格中的內容
    result = result.replace(/^([ \t]*)([-*+]) (.+?)(\n|$)/gm, (match, indent, listMarker, content, afterNewlines) => {
      // 保持前後的換行符號和縮排
      const after = afterNewlines || '';
      return `${indent}${bulletSymbol}${content}${after}`;
    });

    // 有序列表（支援階層），只匹配行首的項目
    if (list.numberStyle !== 'none') {
      const numbers = list.numberStyle === 'circled' ? CIRCLED_NUMBERS : PARENTHESIZED_NUMBERS;
      result = result.replace(/^([ \t]*)(\d+)\. (.+?)(\n|$)/gm, (match, indent, num, content, afterNewlines) => {
        const index = parseInt(num) - 1;
        const after = afterNewlines || '';
        return `${indent}${index < 10 ? numbers[index] : num + '.'} ${content}${after}`;
      });
    }
    
    return result;
  };

  // 計算換頁符號的實際長度
  const getPageNumberLength = (total: number, current: number): number => {
    if (!pageNumberSettings.enabled) {
      return 0;
    }

    return (
      pageNumberSettings.format
        .replace('n', current.toString())
        .replace('m', total.toString()).length + pageNumberSettings.newlineCount
    );
  };

  // 生成換頁符號
  const generatePageNumber = (current: number, total: number): string => {
    if (!pageNumberSettings.enabled) {
      return '';
    }

    return pageNumberSettings.format
      .replace('n', current.toString())
      .replace('m', total.toString());
  };

  const applyPageNumbers = (segments: string[]): string[] => {
    if (!pageNumberSettings.enabled) {
      return segments;
    }

    return segments.map((seg, idx) => {
      const pageNum = generatePageNumber(idx + 1, segments.length);
      const newlines = '\n'.repeat(pageNumberSettings.newlineCount);

      return pageNumberSettings.position === 'top'
        ? `${pageNum}${newlines}${seg}`
        : `${seg}${newlines}${pageNum}`;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    let processedText = inputText;
    
    // 先進行中文轉換
    if (chineseConversion === 'to-tw') {
      processedText = convertToTraditional(processedText);
    } else if (chineseConversion === 'to-cn') {
      processedText = convertToSimplified(processedText);
    }
    
    if (removeReferences) {
      processedText = removeReferenceLinks(processedText);
    }
    if (convertMarkdown) {
      processedText = convertMarkdownToEmoji(processedText);
    }
    
    if (lengthSetting.type === 'none') {
      // 不分割，直接設定為單一段落
      setSegments([processedText]);
    } else {
      // 正常分割邏輯
      const maxLength = lengthSetting.type === 'threads' 
        ? THREADS_MAX_LENGTH 
        : lengthSetting.customValue || THREADS_MAX_LENGTH;
      
      const segs = splitArticle(processedText, maxLength);
      setSegments(segs);
    }
  };

  const handleResetMarkdownSettings = () => {
    setMarkdownSettings(DEFAULT_MARKDOWN_SETTINGS);
  };

  // 檢查是否為 CJK 字元的函數
  function isCJKChar(char: string): boolean {
    return /[\u4e00-\u9fff\u3040-\u309f\u30a0-\u30ff]/.test(char);
  }

  // 計算文字長度的函數
  function calculateLength(text: string, countCJKAsTwo: boolean): number {
    if (!countCJKAsTwo) return text.length;
    
    return text.split('').reduce((acc, char) => {
      return acc + (isCJKChar(char) ? 2 : 1);
    }, 0);
  }

  // 修改 splitArticle 函數
  function splitArticle(text: string, maxLength: number): string[] {
    if (calculateLength(text, countCJKAsTwo) <= maxLength) {
      return applyPageNumbers([text]);
    }

    // 初步分割，考慮最大換頁符號長度
    const maxPageNumLen = getPageNumberLength(99, 99);
    const allowedLenBase = pageNumberSettings.enabled ? maxLength - maxPageNumLen : maxLength;
    let segments = splitSegmentsWithCJK(text, allowedLenBase);

    if (pageNumberSettings.enabled) {
      // 根據實際頁數重新計算
      const actualPageNumLen = getPageNumberLength(segments.length, segments.length);
      if (actualPageNumLen !== maxPageNumLen) {
        const recalculatedAllowedLen = maxLength - actualPageNumLen;
        segments = splitSegmentsWithCJK(text, recalculatedAllowedLen);
      }
    }

    return applyPageNumbers(segments);
  }

  // 修改 splitSegmentsWithCJK 函數
  function splitSegmentsWithCJK(text: string, allowedLen: number): string[] {
    const segments: string[] = [];
    // 移除 trim()，保留原始格式
    let remaining = text;

    while (remaining.length > 0) {
      const cutPos = findSafeCutWithCJK(remaining, allowedLen, countCJKAsTwo);
      // 不使用 trim()，保留空白
      segments.push(remaining.substring(0, cutPos));
      // 不使用 trim()，保留空白
      remaining = remaining.substring(cutPos);
    }
    return segments;
  }

  // 修改 findSafeCutWithCJK 函數
  function findSafeCutWithCJK(text: string, allowedLen: number, countCJKAsTwo: boolean): number {
    const currentLength = calculateLength(text, countCJKAsTwo);
    if (currentLength <= allowedLen) return text.length;

    let accumulatedLength = 0;
    let lastSafePos = 0;
    
    // 保留開頭的空白字符
    let i = 0;
    while (i < text.length && (text[i] === ' ' || text[i] === '\t')) {
      i++;
    }
    // 將空白字符的長度加入累計
    accumulatedLength = i;

    for (; i < text.length; i++) {
      const char = text[i];
      accumulatedLength += countCJKAsTwo && isCJKChar(char) ? 2 : 1;
      
      if (accumulatedLength > allowedLen) {
        // 向後尋找合適的切割點
        for (let j = i; j >= 0; j--) {
          const char = text[j];
          if ((char === '\n' || char === '。' || char === '.') && !isInsideBrackets(text, j)) {
            return j + 1;
          }
        }
        return lastSafePos || i;
      }
      
      // 更新最後的安全切割點
      if (char === '\n' || char === '。' || char === '.') {
        lastSafePos = i + 1;
      }
    }
    return text.length;
  }

  /**
   * 檢查指定位置是否在括號內
   * 使用堆疊算法處理巢狀括號
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

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 設定區域 - 兩欄布局 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* 左欄 - 基本設定 */}
          <div className="space-y-6">
            {/* 長度設定 */}
            <div className="bg-white p-4 rounded-lg border shadow-sm">
              <h2 className="text-lg font-medium mb-4">{t.lengthSettings.title}</h2>
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
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    checked={lengthSetting.type === 'none'}
                    onChange={() => setLengthSetting({ type: 'none' })}
                    className="form-radio"
                  />
                  <span>{t.lengthSettings.none}</span>
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

            {/* 寬度設定 */}
            <div className="bg-white p-4 rounded-lg border shadow-sm">
              <h2 className="text-lg font-medium mb-4">{t.widthSettings.title}</h2>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    checked={widthSetting.type === 'threads'}
                    onChange={() => setWidthSetting(prev => ({ 
                      ...prev,
                      type: 'threads'
                    }))}
                    className="form-radio"
                  />
                  <span>{t.widthSettings.threads}</span>
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    checked={widthSetting.type === 'custom'}
                    onChange={() => setWidthSetting(prev => ({ 
                      ...prev,
                      type: 'custom'
                    }))}
                    className="form-radio"
                  />
                  <span>{t.widthSettings.custom}</span>
                  <input
                    type="number"
                    value={widthSetting.customValue || THREADS_WIDTH}
                    onChange={(e) => {
                      const value = e.target.value;
                      setWidthSetting(prev => ({
                        ...prev,
                        type: 'custom',
                        customValue: value === '' ? undefined : parseFloat(value)
                      }));
                    }}
                    onBlur={(e) => {
                      const value = parseFloat(e.target.value);
                      setWidthSetting(prev => ({
                        ...prev,
                        type: 'custom',
                        customValue: Math.max(200, Math.min(1200, value || THREADS_WIDTH))
                      }));
                    }}
                    onFocus={() => {
                      if (widthSetting.type !== 'custom') {
                        setWidthSetting(prev => ({
                          ...prev,
                          type: 'custom'
                        }));
                      }
                    }}
                    step="0.1"
                    className="w-24 px-2 py-1 border rounded"
                    min="200"
                    max="1200"
                  />
                  <span className="text-sm text-gray-500">px</span>
                </div>
              </div>
            </div>

            {/* 文字計算設定 */}
            <div className="bg-white p-4 rounded-lg border shadow-sm">
              <h2 className="text-lg font-medium mb-4">{t.options.textCalculation.title}</h2>
              <div className="space-y-4">
                {/* 參考連結選項 */}
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="removeReferences"
                    checked={removeReferences}
                    onChange={(e) => setRemoveReferences(e.target.checked)}
                    className="form-checkbox h-4 w-4 text-blue-500"
                  />
                  <label htmlFor="removeReferences" className="text-sm text-gray-700 flex items-center space-x-2">
                    <span>{t.options.removeReferences}</span>
                    <div className="relative group">
                      <QuestionMarkCircleIcon className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {t.options.removeReferences_tooltip}
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                          <div className="border-4 border-transparent border-t-gray-900"></div>
                        </div>
                      </div>
                    </div>
                  </label>
                </div>
                {/* CJK 字元計算選項 */}
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="countCJKAsTwo"
                    checked={countCJKAsTwo}
                    onChange={(e) => setCountCJKAsTwo(e.target.checked)}
                    className="form-checkbox h-4 w-4 text-blue-500"
                  />
                  <label htmlFor="countCJKAsTwo" className="text-sm text-gray-700">
                    {t.options.countCJKAsTwo}
                  </label>
                  <span className="text-sm text-gray-500 ml-2">
                    {t.options.countCJKAsTwo_help}
                  </span>
                </div>
                {/* 中文轉換選項 */}
                <div className="space-y-2">
                  <label className="text-sm text-gray-600 block">
                    {t.options.chineseConversion.title}
                  </label>
                  <select
                    value={chineseConversion}
                    onChange={(e) => setChineseConversion(e.target.value as typeof chineseConversion)}
                    className="w-full px-2 py-1 border rounded"
                  >
                    <option value="none">{t.options.chineseConversion.none}</option>
                    <option value="to-tw">{t.options.chineseConversion.toTraditional}</option>
                    <option value="to-cn">{t.options.chineseConversion.toSimplified}</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* 右欄 - 進階設定 */}
          <div className="space-y-6">
            {/* Markdown 轉換設定 */}
            <div className="bg-white p-4 rounded-lg border shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium">{t.options.convertMarkdown}</h2>
                <input
                  type="checkbox"
                  id="convertMarkdown"
                  checked={convertMarkdown}
                  onChange={(e) => setConvertMarkdown(e.target.checked)}
                  className="form-checkbox h-4 w-4 text-blue-500"
                />
              </div>
              {convertMarkdown && (
                <div className="mt-4 space-y-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium">{t.options.markdownSettings.title}</h3>
                    <button
                      type="button"
                      onClick={handleResetMarkdownSettings}
                      className="text-sm text-blue-500 hover:text-blue-600"
                    >
                      {t.options.markdownSettings.reset}
                    </button>
                  </div>
                  
                  <div className="space-y-6">
                    {/* 標題設定 */}
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 mb-3">{t.options.markdownSettings.headings.title}</h3>
                      <div className="space-y-4">
                        {(Object.entries(markdownSettings.headings) as [HeadingKey, SymbolPair][]).map(([key, value]) => (
                          <div key={key} className="flex items-center justify-between">
                            <label className="text-sm text-gray-600">
                              {t.options.markdownSettings.headings[key as keyof typeof t.options.markdownSettings.headings]}
                            </label>
                            <div className="flex items-center space-x-2">
                              <input
                                type="text"
                                value={value.left}
                                onChange={(e) => setMarkdownSettings(prev => ({
                                  ...prev,
                                  headings: {
                                    ...prev.headings,
                                    [key]: {
                                      ...prev.headings[key as HeadingKey],
                                      left: e.target.value
                                    }
                                  }
                                }))}
                                className="w-20 px-2 py-1 border rounded"
                              />
                              <input
                                type="text"
                                value={value.right}
                                onChange={(e) => setMarkdownSettings(prev => ({
                                  ...prev,
                                  headings: {
                                    ...prev.headings,
                                    [key]: {
                                      ...prev.headings[key as HeadingKey],
                                      right: e.target.value
                                    }
                                  }
                                }))}
                                className="w-20 px-2 py-1 border rounded"
                              />
                              <label className="flex items-center space-x-2">
                                <input
                                  type="checkbox"
                                  checked={value.useLeft}
                                  onChange={(e) => setMarkdownSettings(prev => ({
                                    ...prev,
                                    headings: {
                                      ...prev.headings,
                                      [key]: {
                                        ...prev.headings[key as HeadingKey],
                                        useLeft: e.target.checked
                                      }
                                    }
                                  }))}
                                  className="form-checkbox h-4 w-4"
                                />
                                <span className="text-sm">{t.options.markdownSettings.headings.useLeft}</span>
                              </label>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 強調設定 */}
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 mb-3">{t.options.markdownSettings.emphasis.title}</h3>
                      <div className="space-y-4">
                        {(Object.entries(markdownSettings.emphasis) as [EmphasisKey, SymbolPair][]).map(([key, value]) => (
                          <div key={key} className="flex items-center justify-between">
                            <label className="text-sm text-gray-600">
                              {t.options.markdownSettings.emphasis[key as keyof typeof t.options.markdownSettings.emphasis]}
                            </label>
                            <div className="flex items-center space-x-2">
                              <input
                                type="text"
                                value={value.left}
                                onChange={(e) => setMarkdownSettings(prev => ({
                                  ...prev,
                                  emphasis: {
                                    ...prev.emphasis,
                                    [key]: {
                                      ...prev.emphasis[key as EmphasisKey],
                                      left: e.target.value
                                    }
                                  }
                                }))}
                                className="w-20 px-2 py-1 border rounded"
                              />
                              <input
                                type="text"
                                value={value.right}
                                onChange={(e) => setMarkdownSettings(prev => ({
                                  ...prev,
                                  emphasis: {
                                    ...prev.emphasis,
                                    [key]: {
                                      ...prev.emphasis[key as EmphasisKey],
                                      right: e.target.value
                                    }
                                  }
                                }))}
                                className="w-20 px-2 py-1 border rounded"
                              />
                              <label className="flex items-center space-x-2">
                                <input
                                  type="checkbox"
                                  checked={value.useLeft}
                                  onChange={(e) => setMarkdownSettings(prev => ({
                                    ...prev,
                                    emphasis: {
                                      ...prev.emphasis,
                                      [key]: {
                                        ...prev.emphasis[key as EmphasisKey],
                                        useLeft: e.target.checked
                                      }
                                    }
                                  }))}
                                  className="form-checkbox h-4 w-4"
                                />
                                <span className="text-sm">{t.options.markdownSettings.headings.useLeft}</span>
                              </label>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 列表設定 */}
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 mb-3">{t.options.markdownSettings.list.title}</h3>
                      <div className="space-y-4">
                        {/* 無序列表符號 */}
                        <div className="flex items-center justify-between">
                          <label className="text-sm text-gray-600">
                            {t.options.markdownSettings.list.bullet}
                          </label>
                          <div className="flex items-center space-x-2 relative">
                            <select
                              value={BULLET_OPTIONS.includes(markdownSettings.list.bullet) ? markdownSettings.list.bullet : 'custom'}
                              onChange={(e) => {
                                const value = e.target.value;
                                if (value === 'custom') {
                                  setMarkdownSettings(prev => ({
                                    ...prev,
                                    list: {
                                      ...prev.list,
                                      bullet: 'custom',
                                      customBullet: ''
                                    }
                                  }));
                                } else {
                                  setMarkdownSettings(prev => ({
                                    ...prev,
                                    list: {
                                      ...prev.list,
                                      bullet: value,
                                      customBullet: undefined
                                    }
                                  }));
                                }
                              }}
                              className="w-32 px-2 py-1 border rounded"
                            >
                              {BULLET_OPTIONS.map(option => (
                                <option key={option} value={option}>{option}</option>
                              ))}
                              <option value="custom">{t.options.markdownSettings.list.customBullet}</option>
                            </select>
                            
                            {/* 自訂符號輸入框 */}
                            {markdownSettings.list.bullet === 'custom' && (
                              <div className="flex items-center space-x-2">
                                <input
                                  type="text"
                                  value={markdownSettings.list.customBullet || ''}
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    setMarkdownSettings(prev => ({
                                      ...prev,
                                      list: {
                                        ...prev.list,
                                        bullet: 'custom',
                                        customBullet: value
                                      }
                                    }));
                                  }}
                                  className="w-20 px-2 py-1 border rounded"
                                  placeholder={t.options.markdownSettings.list.customBullet}
                                />
                                <button
                                  type="button"
                                  onClick={() => setShowEmojiPicker(prev => !prev)}
                                  className="p-2 hover:bg-gray-100 rounded"
                                >
                                  😀
                                </button>
                                {showEmojiPicker && (
                                  <div className="absolute right-0 top-full mt-1 z-50">
                                    <EmojiPicker
                                      onEmojiClick={(emojiData) => {
                                        setMarkdownSettings(prev => ({
                                          ...prev,
                                          list: {
                                            ...prev.list,
                                            bullet: 'custom',
                                            customBullet: emojiData.emoji
                                          }
                                        }));
                                        setShowEmojiPicker(false);
                                      }}
                                    />
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* 數字列表樣式 */}
                        <div className="flex items-center justify-between">
                          <label className="text-sm text-gray-600">
                            {t.options.markdownSettings.list.numberStyle}
                          </label>
                          <select
                            value={markdownSettings.list.numberStyle}
                            onChange={(e) => setMarkdownSettings(prev => ({
                              ...prev,
                              list: {
                                ...prev.list,
                                numberStyle: e.target.value as 'none' | 'circled' | 'parenthesized'
                              }
                            }))}
                            className="w-48 px-2 py-1 border rounded"
                          >
                            {Object.entries(t.options.markdownSettings.list.numberStyles).map(([key, value]) => (
                              <option key={key} value={key}>{value}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* 標題換行設定 */}
                    <div className="flex items-center space-x-2 pt-4 border-t">
                      <input
                        type="checkbox"
                        id="headingNewline"
                        checked={markdownSettings.headingNewline}
                        onChange={(e) => setMarkdownSettings(prev => ({
                          ...prev,
                          headingNewline: e.target.checked
                        }))}
                        className="form-checkbox h-4 w-4 text-blue-500"
                      />
                      <label htmlFor="headingNewline" className="text-sm text-gray-700">
                        {t.options.markdownSettings.headingNewline}
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 換頁符號設定 */}
            <div className="bg-white p-4 rounded-lg border shadow-sm">
              <h2 className="text-lg font-medium mb-4">{t.options.pageNumberSettings.title}</h2>
              <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-gray-600 block mb-1">
                      {t.options.pageNumberSettings.enable}
                    </label>
                    <input
                      type="checkbox"
                      checked={pageNumberSettings.enabled}
                      onChange={(e) => setPageNumberSettings(prev => ({
                        ...prev,
                        enabled: e.target.checked,
                      }))}
                      className="form-checkbox h-4 w-4 text-blue-500"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-gray-600 block mb-1">
                      {t.options.pageNumberSettings.format}
                    </label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={pageNumberSettings.format}
                        onChange={(e) => setPageNumberSettings(prev => ({
                          ...prev,
                          format: e.target.value
                        }))}
                        className="flex-1 px-2 py-1 border rounded disabled:bg-gray-100"
                        disabled={!pageNumberSettings.enabled}
                      />
                      <div className="text-sm text-gray-500">
                        {t.options.pageNumberSettings.formatHelp}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm text-gray-600 block mb-1">
                      {t.options.pageNumberSettings.position}
                    </label>
                    <div className="space-x-4">
                      <label className={"inline-flex items-center " + (!pageNumberSettings.enabled ? 'opacity-50' : '')}>
                        <input
                          type="radio"
                          checked={pageNumberSettings.position === 'top'}
                          onChange={() => setPageNumberSettings(prev => ({
                            ...prev,
                            position: 'top'
                          }))}
                          className="form-radio"
                          disabled={!pageNumberSettings.enabled}
                        />
                        <span className="ml-2 text-sm">{t.options.pageNumberSettings.positions.top}</span>
                      </label>
                      <label className={"inline-flex items-center " + (!pageNumberSettings.enabled ? 'opacity-50' : '')}>
                        <input
                          type="radio"
                          checked={pageNumberSettings.position === 'bottom'}
                          onChange={() => setPageNumberSettings(prev => ({
                            ...prev,
                            position: 'bottom'
                          }))}
                          className="form-radio"
                          disabled={!pageNumberSettings.enabled}
                        />
                        <span className="ml-2 text-sm">{t.options.pageNumberSettings.positions.bottom}</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm text-gray-600 block mb-1">
                      {t.options.pageNumberSettings.newlineCount}
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="5"
                      value={pageNumberSettings.newlineCount}
                      onChange={(e) => setPageNumberSettings(prev => ({
                        ...prev,
                        newlineCount: Math.max(1, Math.min(5, parseInt(e.target.value) || 2))
                      }))}
                      className="w-20 px-2 py-1 border rounded disabled:bg-gray-100"
                      disabled={!pageNumberSettings.enabled}
                    />
                  </div>

                  <div className="mt-2 text-sm text-gray-500">
                    {t.options.pageNumberSettings.preview}: {generatePageNumber(1, 3) || '-'}
                  </div>

              </div>
            </div>
          </div>
        </div>

        {/* 文字輸入區域 - 跨越兩欄 */}
        <div className="space-y-4">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="w-full h-48 p-4 border rounded-lg shadow-sm"
            placeholder={t.input.placeholder}
          />
          <button
            type="submit"
            className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            {lengthSetting.type === 'none' ? t.buttons.convert : t.buttons.split}
          </button>
        </div>
      </form>

      {/* 結果顯示區域 */}
      {segments.length > 0 && (
        <div 
          className="space-y-4 mx-auto"
          style={{ maxWidth: `${currentWidth}px` }}
        >
          {segments.map((seg, idx) => (
            <SplitResult 
              key={idx} 
              text={seg} 
              translations={t}
              countCJKAsTwo={countCJKAsTwo}
            />
          ))}
        </div>
      )}
    </div>
  );
}
