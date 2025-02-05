export type Language = 'en' | 'zh-TW' | 'zh-CN' | 'ja';

export interface MarkdownSettings {
  h1: string;
  h2: string;
  h3: string;
  list: string;
  headingNewline: boolean;
}

export interface PageNumberPosition = 'top' | 'bottom';

export interface PageNumberSettings {
  format: string;
  position: PageNumberPosition;
  newlineCount: number;
}

export type WidthType = 'threads' | 'custom';

export interface WidthSetting {
  type: WidthType;
  customValue?: number;
}

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
    copyCount: string;
  };
  options: {
    removeReferences: string;
    removeReferences_tooltip: string;
    convertMarkdown: string;
    markdownSettings: {
      title: string;
      h1: string;
      h2: string;
      h3: string;
      list: string;
      reset: string;
      headingNewline: string;
    };
    pageNumberSettings: {
      title: string;
      format: string;
      position: string;
      positions: {
        top: string;
        bottom: string;
      };
      formatHelp: string;
      preview: string;
      newlineCount: string;
    };
    countCJKAsTwo: string;
    countCJKAsTwo_help: string;
    textCalculation: {
      title: string;
    };
  };
  widthSettings: {
    title: string;
    threads: string;
    custom: string;
  };
  footer: {
    version: string;
    author: string;
  };
} 