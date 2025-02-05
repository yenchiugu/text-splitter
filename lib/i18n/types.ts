export type Language = 'en' | 'zh-TW' | 'zh-CN' | 'ja';

export interface MarkdownSettings {
  headings: HeadingSymbols;
  emphasis: EmphasisSymbols;
  list: ListSymbols;
  headingNewline: boolean;
}

export type PageNumberPosition = 'top' | 'bottom';

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

export interface SymbolPair {
  left: string;
  right: string;
  useLeft: boolean;
}

export interface HeadingSymbols {
  h1: SymbolPair;
  h2: SymbolPair;
  h3: SymbolPair;
}

export interface EmphasisSymbols {
  bold: SymbolPair;
  italic: SymbolPair;
}

export interface ListSymbols {
  bullet: string;
  customBullet?: string;
  numberStyle: 'none' | 'circled' | 'parenthesized';
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
      headings: {
        title: string;
        h1: string;
        h2: string;
        h3: string;
        left: string;
        right: string;
        useLeft: string;
      };
      emphasis: {
        title: string;
        bold: string;
        italic: string;
      };
      list: {
        title: string;
        bullet: string;
        customBullet: string;
        numberStyle: string;
        numberStyles: {
          none: string;
          circled: string;
          parenthesized: string;
        };
        preview: string;
      };
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
    email: string;
    social: {
      threads: string;
      x: string;
    };
  };
} 