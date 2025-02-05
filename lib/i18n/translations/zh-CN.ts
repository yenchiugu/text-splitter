import { Translations } from '../types';

export const zhCN: Translations = {
  title: '文字分割器',
  meta: {
    description: '将您的文字分割成适合社交媒体的片段',
  },
  lengthSettings: {
    title: '最大长度设置',
    threads: 'Threads 最大长度（500字符）',
    custom: '自定义长度',
  },
  input: {
    placeholder: '请输入要分割的文章...',
  },
  buttons: {
    split: '分割文章',
    copy: '复制',
    copied: '已复制',
  },
  stats: {
    charCount: '字数：',
    copyCount: '已复制 {count} 次',
  },
  options: {
    removeReferences: '移除参考链接',
    removeReferences_tooltip: '将 ChatGPT 复制内容的大量参考链接删除',
    convertMarkdown: '将 Markdown 符号转换为表情符号',
    markdownSettings: {
      title: 'Markdown 转换设置',
      headings: {
        title: '标题设置',
        h1: '一级标题',
        h2: '二级标题',
        h3: '三级标题',
        left: '左侧符号',
        right: '右侧符号',
        useLeft: '使用左侧符号',
      },
      emphasis: {
        title: '强调设置',
        bold: '粗体',
        italic: '斜体',
      },
      list: {
        title: '列表设置',
        bullet: '无序列表符号',
        customBullet: '自定符号',
        numberStyle: '数字列表样式',
        numberStyles: {
          none: '不转换',
          circled: '圆圈数字 ①②③',
          parenthesized: '括号数字 ⑴⑵⑶',
        },
        preview: '预览',
      },
      reset: '重设为默认值',
      headingNewline: '标题后加入换行',
    },
    pageNumberSettings: {
      title: '分页符号设置',
      format: '格式（使用 n 表示当前页码，m 表示总页数）',
      position: '位置',
      positions: {
        top: '内容最上方',
        bottom: '内容最下方',
      },
      formatHelp: '例：(n/m)、页码[n/m]、第n页',
      preview: '预览',
      newlineCount: '换行符号数量',
    },
    countCJKAsTwo: '将中日韩文字计算为两个字符',
    countCJKAsTwo_help: '(用于 X.com/Twitter，Threads 不需要)',
    textCalculation: {
      title: '文字计算设置',
    },
  },
  widthSettings: {
    title: '预览宽度设置',
    threads: 'Threads 宽度 (542.4px)',
    custom: '自定义宽度',
  },
  footer: {
    version: '版本',
    author: '作者',
    email: '发送邮件给作者',
    social: {
      threads: '在 Threads 上关注',
      x: '在 X 上关注',
    },
  },
} as const; 