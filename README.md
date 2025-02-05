# ThreadSplitter - Smart Thread Composer

ThreadSplitter is a smart text splitting tool designed specifically for Threads and Twitter/X platforms. It intelligently splits long text into appropriate segments while maintaining readability and content integrity.

[中文版本](#threadsplitter---智慧型長文分割工具)

## Key Features

### 1. Smart Splitting
- Automatically splits text while preserving sentence and paragraph integrity
- Supports custom maximum length (default: Threads 500 characters limit)
- Smart handling of text within brackets to avoid improper breaks

### 2. Multilingual Support
- Interface available in Traditional Chinese, Simplified Chinese, Japanese, and English
- Complete localization

### 3. Markdown Conversion
- Converts Markdown syntax to emojis
- Customizable emojis for headings and lists
- Optional line breaks after headings

### 4. Page Number Settings
- Customizable page number format and position
- Adjustable line break count
- Real-time preview

### 5. Special Features
- Removes reference links from ChatGPT output
- CJK character double-width calculation (for Twitter/X)
- Preview width adjustment (matches Threads display width)

### 6. Copy Tracking
- Shows copy count for each segment
- Visual feedback for copy status
- Helps track posting progress

## Author Information

- Author: Sam Ku
- Email: yenchiugu@gmail.com
- Threads: [@yenchiugu](https://www.threads.net/@yenchiugu)
- X: [@yenchiugu](https://x.com/yenchiugu)
- Version: 1.0.0

## Technical Stack

- Next.js 13 App Router
- TypeScript
- Tailwind CSS
- Heroicons

---

# ThreadSplitter - 智慧型長文分割工具

ThreadSplitter 是一個專為 Threads 和 Twitter/X 平台設計的智慧型長文分割工具。它能夠智慧地將長文分割成適合的片段，同時保持文章的完整性和可讀性。

[English Version](#threadsplitter---smart-thread-composer)

## 主要功能

### 1. 智慧分割
- 自動分割長文，保持句子和段落的完整性
- 支援自訂最大長度（預設為 Threads 的 500 字元限制）
- 智慧處理括號內的文字，避免不當斷句

### 2. 多語言支援
- 支援繁體中文、簡體中文、日文和英文介面
- 完整的在地化翻譯

### 3. Markdown 轉換
- 將 Markdown 標記轉換為表情符號
- 可自訂標題和列表的表情符號
- 支援標題後自動換行

### 4. 頁碼設定
- 自訂頁碼格式和位置
- 支援頁碼前後的換行數量設定
- 即時預覽頁碼效果

### 5. 特殊功能
- 移除 ChatGPT 產生的參考連結
- CJK 字元雙倍寬度計算（適用於 Twitter/X）
- 預覽寬度調整（符合 Threads 實際顯示寬度）

### 6. 複製追蹤
- 顯示已複製次數
- 複製狀態視覺回饋
- 協助追蹤發文進度

## 作者資訊

- 作者：Sam Ku
- Email：yenchiugu@gmail.com
- Threads：[@yenchiugu](https://www.threads.net/@yenchiugu)
- X：[@yenchiugu](https://x.com/yenchiugu)
- 版本：1.0.0

## 技術實作

- Next.js 13 App Router
- TypeScript
- Tailwind CSS
- Heroicons

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
