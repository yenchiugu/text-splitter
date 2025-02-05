export type Language = 'en' | 'zh-TW' | 'zh-CN' | 'ja';

export interface Translations {
  title: string;
  lengthSettings: {
    title: string;
    threads: string;
    custom: string;
  };
  input: {
    placeholder: string;
  };
  buttons: {
    split: string;
    copy: string;
    copied: string;
  };
  stats: {
    charCount: string;
  };
} 