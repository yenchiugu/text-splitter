import { Translations } from '../types';

export const zhTW: Translations = {
  title: 'ThreadSplitter - 智慧型長文分割工具',
  lengthSettings: {
    title: '最大長度設定',
    threads: 'Threads 最大長度（500字元）',
    custom: '自訂長度',
  },
  input: {
    placeholder: '請輸入要分割的文章...',
  },
  buttons: {
    split: '分割文章',
    copy: '複製',
    copied: '已複製',
  },
  stats: {
    charCount: '字數：',
    copyCount: '已複製 {count} 次',
  },
  options: {
    removeReferences: '移除參考連結',
    removeReferences_tooltip: '將 ChatGPT 複製內容的大量參考連結刪除',
    convertMarkdown: '將 Markdown 符號轉換為表情符號',
    markdownSettings: {
      title: 'Markdown 轉換設定',
      headings: {
        title: '標題設定',
        h1: '一級標題',
        h2: '二級標題',
        h3: '三級標題',
        left: '左側符號',
        right: '右側符號',
        useLeft: '使用左側符號',
      },
      emphasis: {
        title: '強調設定',
        bold: '粗體',
        italic: '斜體',
      },
      list: {
        title: '列表設定',
        bullet: '無序列表符號',
        customBullet: '自訂符號',
        numberStyle: '數字列表樣式',
        numberStyles: {
          none: '不轉換',
          circled: '圓圈數字 ①②③',
          parenthesized: '括號數字 ⑴⑵⑶',
        },
        preview: '預覽',
      },
      reset: '重設為預設值',
      headingNewline: '標題後加入換行',
    },
    pageNumberSettings: {
      title: '換頁符號設定',
      format: '格式（使用 n 表示當前頁碼，m 表示總頁數）',
      position: '位置',
      positions: {
        top: '內容最上方',
        bottom: '內容最下方',
      },
      formatHelp: '例：(n/m)、頁碼[n/m]、第n頁',
      preview: '預覽',
      newlineCount: '換行符號數量',
    },
    countCJKAsTwo: '將中日韓文字計算為兩個字元',
    countCJKAsTwo_help: '(用於 X.com/Twitter，Threads 不需要)',
    textCalculation: {
      title: '文字計算設定',
    },
  },
  widthSettings: {
    title: '預覽寬度設定',
    threads: 'Threads 寬度 (542.4px)',
    custom: '自訂寬度',
  },
  footer: {
    version: '版本',
    author: '作者',
    email: '寄信給作者',
    social: {
      threads: '在 Threads 上關注',
      x: '在 X 上關注',
    },
  },
}; 