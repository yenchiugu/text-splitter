import { Converter } from 'opencc-js';

// 建立轉換器實例
const tw2s = Converter({ from: 'tw', to: 'cn' });
const s2tw = Converter({ from: 'cn', to: 'tw' });

export function convertToSimplified(text: string): string {
  return tw2s(text);
}

export function convertToTraditional(text: string): string {
  return s2tw(text);
} 