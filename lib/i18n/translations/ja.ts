import { Translations } from '../types';

export const ja: Translations = {
  title: 'ThreadSplitter - スマート投稿分割ツール',
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
      h1: '見出し1 (#)',
      h2: '見出し2 (##)',
      h3: '見出し3 (###)',
      list: 'リスト項目 (-, *, +)',
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
  },
}; 