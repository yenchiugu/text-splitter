import { Translations } from '../types';

export const ja: Translations = {
  title: '文織',
  meta: {
    description: 'スマート投稿分割ツール。Markdown対応、CJK文字完全サポート',
  },
  lengthSettings: {
    title: '最大長設定',
    threads: 'Threads最大長（500文字）',
    custom: 'カスタム長',
  },
  input: {
    placeholder: '分割したいテキストを入力してください...',
  },
  buttons: {
    split: 'テキストを分割',
    copy: 'コピー',
    copied: 'コピー済み',
  },
  stats: {
    charCount: '文字数：',
    copyCount: '{count} 回コピー済み',
  },
  options: {
    removeReferences: '参照リンクを削除',
    removeReferences_tooltip: 'ChatGPTからコピーした内容の参照リンクを削除します',
    convertMarkdown: 'Markdown記号を絵文字に変換',
    markdownSettings: {
      title: 'Markdown変換設定',
      headings: {
        title: '見出し設定',
        h1: '見出し1',
        h2: '見出し2',
        h3: '見出し3',
        left: '左記号',
        right: '右記号',
        useLeft: '左記号を使用',
      },
      emphasis: {
        title: '強調設定',
        bold: '太字',
        italic: '斜体',
      },
      list: {
        title: 'リスト設定',
        bullet: '箇条書き記号',
        customBullet: 'カスタム記号',
        numberStyle: '番号スタイル',
        numberStyles: {
          none: '変換なし',
          circled: '丸数字 ①②③',
          parenthesized: '括弧付き数字 ⑴⑵⑶',
        },
        preview: 'プレビュー',
      },
      reset: 'デフォルトに戻す',
      headingNewline: '見出し後に改行を追加',
    },
    pageNumberSettings: {
      title: 'ページ番号設定',
      format: '書式（n は現在のページ、m は総ページ数）',
      position: '位置',
      positions: {
        top: '内容の先頭',
        bottom: '内容の末尾',
      },
      formatHelp: '例：(n/m)、ページ[n/m]、第n頁',
      preview: 'プレビュー',
      newlineCount: '改行記号の数',
    },
    countCJKAsTwo: 'CJK文字を2文字として計算',
    countCJKAsTwo_help: '(X.com/Twitter用、Threadsでは不要)',
    textCalculation: {
      title: 'テキスト計算設定',
    },
  },
  widthSettings: {
    title: 'プレビュー幅設定',
    threads: 'Threads幅 (542.4px)',
    custom: 'カスタム幅',
  },
  footer: {
    version: 'バージョン',
    author: '作者',
    email: '作者にメール',
    social: {
      threads: 'Threadsでフォロー',
      x: 'Xでフォロー',
    },
  },
} as const; 