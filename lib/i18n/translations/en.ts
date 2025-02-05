import { Translations } from '../types';

export const en: Translations = {
  title: 'ThreadCraft',
  meta: {
    description: 'Smart text splitter for crafting perfect social media threads. Supports Markdown and CJK characters.',
  },
  lengthSettings: {
    title: 'Maximum Length Settings',
    threads: 'Threads Maximum Length (500 characters)',
    custom: 'Custom Length',
  },
  input: {
    placeholder: 'Enter the text to split...',
  },
  buttons: {
    split: 'Split Text',
    copy: 'Copy',
    copied: 'Copied',
  },
  stats: {
    charCount: 'Characters: ',
    copyCount: 'Copied {count} times',
  },
  options: {
    removeReferences: 'Remove reference links',
    removeReferences_tooltip: 'Remove reference links from ChatGPT copied content',
    convertMarkdown: 'Convert Markdown to emoji',
    markdownSettings: {
      title: 'Markdown Conversion Settings',
      headings: {
        title: 'Heading Settings',
        h1: 'Heading 1',
        h2: 'Heading 2',
        h3: 'Heading 3',
        left: 'Left Symbol',
        right: 'Right Symbol',
        useLeft: 'Use Left Symbol',
      },
      emphasis: {
        title: 'Emphasis Settings',
        bold: 'Bold',
        italic: 'Italic',
      },
      list: {
        title: 'List Settings',
        bullet: 'Bullet List Symbol',
        customBullet: 'Custom Symbol',
        numberStyle: 'Number List Style',
        numberStyles: {
          none: 'No Conversion',
          circled: 'Circled Numbers ①②③',
          parenthesized: 'Parenthesized Numbers ⑴⑵⑶',
        },
        preview: 'Preview',
      },
      reset: 'Reset to Default',
      headingNewline: 'Add Line Break After Headings',
    },
    pageNumberSettings: {
      title: 'Page Number Settings',
      format: 'Format (use n for current page, m for total pages)',
      position: 'Position',
      positions: {
        top: 'Top of content',
        bottom: 'Bottom of content',
      },
      formatHelp: 'Example: (n/m), Page [n/m], Page n',
      preview: 'Preview',
      newlineCount: 'Number of line breaks',
    },
    countCJKAsTwo: 'Count CJK characters as two',
    countCJKAsTwo_help: '(for X.com/Twitter, not needed for Threads)',
    textCalculation: {
      title: 'Text Calculation Settings',
    },
  },
  widthSettings: {
    title: 'Preview Width Settings',
    threads: 'Threads Width (542.4px)',
    custom: 'Custom Width',
  },
  footer: {
    version: 'Version',
    author: 'Author',
    email: 'Email the author',
    social: {
      threads: 'Follow on Threads',
      x: 'Follow on X',
    },
  },
} as const; 