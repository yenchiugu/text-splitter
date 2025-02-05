# ThreadSplitter

[English](#english) | [中文](#中文)

## English

ThreadSplitter is a smart text splitting tool designed for social media platforms, with special focus on Threads and X/Twitter.

### Features

- **Smart Text Splitting**
  - Respects sentence boundaries
  - Preserves bracket pairs
  - Supports CJK characters
  - Configurable maximum length

- **Markdown to Emoji Conversion**
  - Headings with customizable symbols
  - Lists with emoji bullets
  - Numbered lists with special characters (①, ②, ③)
  - Bold and italic text conversion

- **Page Number Options**
  - Customizable format
  - Flexible positioning
  - Adjustable line breaks

- **User Interface**
  - Multi-language support (English, Traditional Chinese, Simplified Chinese, Japanese)
  - Live preview
  - Copy to clipboard functionality
  - Character count display

### Usage

1. Enter or paste your text
2. Configure settings as needed
3. Click "Split Text"
4. Copy the split segments

### Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

---

## 中文

ThreadSplitter 是一個智慧型文字分割工具，專為社群媒體平台設計，特別針對 Threads 和 X/Twitter 優化。

### 功能特色

- **智慧分割**
  - 保持句子完整性
  - 維持括號配對
  - 支援中日韓文字
  - 可調整最大長度

- **Markdown 轉換**
  - 可自訂標題符號
  - 支援 emoji 列表符號
  - 特殊數字列表 (①, ②, ③)
  - 粗體與斜體轉換

- **換頁符號設定**
  - 自訂格式
  - 靈活的位置選擇
  - 可調整換行數量

- **使用者介面**
  - 多語言支援（英文、繁中、簡中、日文）
  - 即時預覽
  - 一鍵複製
  - 字數統計

### 使用方式

1. 輸入或貼上文字
2. 依需求調整設定
3. 點擊「分割文章」
4. 複製分割後的內容

### 開發相關

```bash
# 安裝相依套件
npm install

# 執行開發伺服器
npm run dev

# 建置正式版本
npm run build
```

## License

MIT License

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
text-splitter/
├── app/
│   ├── page.tsx           # Main page component
│   └── layout.tsx         # Root layout
├── components/
│   ├── TextSplitter.tsx   # Main text splitting component
│   └── SplitResult.tsx    # Individual result display
├── lib/
│   └── i18n/             # Internationalization
│       ├── index.ts      # i18n setup
│       ├── types.ts      # Type definitions
│       └── translations/ # Language files
└── public/               # Static assets
```

## Internationalization

To add a new language:

1. Add language code to `Language` type in `lib/i18n/types.ts`
2. Create new translation file in `lib/i18n/translations/`
3. Add language to `LANGUAGES` array in `lib/i18n/index.ts`

## Technical Details

### Text Splitting Algorithm

1. Initial length check
   - If text length ≤ max length, return as is
2. Prefix calculation
   - Format: "(n/m) "
   - Dynamic length based on total segments
3. Safe cut point finding
   - Scans backwards from max length
   - Checks for sentence endings and brackets
4. Segment assembly
   - Adds prefix for multiple segments
   - Preserves original text for single segment

### URL Parameters

- `lang`: Language code
  - Example: `?lang=ja` for Japanese
  - Supported: `en`, `zh-TW`, `zh-CN`, `ja`

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## License

MIT License

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
