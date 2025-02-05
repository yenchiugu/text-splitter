import { Translations } from '../types';

export const en: Translations = {
  title: 'ThreadSplitter - Smart Thread Composer',
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
      h1: 'Heading 1 (#)',
      h2: 'Heading 2 (##)',
      h3: 'Heading 3 (###)',
      list: 'List item (-, *, +)',
      reset: 'Reset to default',
      headingNewline: 'Add line break after headings',
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
  },
}; 