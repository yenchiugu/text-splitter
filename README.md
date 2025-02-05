# Text Splitter for Threads

A web application that helps split long text into segments suitable for platforms with character limits, such as Threads (500 characters). Built with Next.js and TypeScript.

## Features

- 🔄 Smart text splitting that preserves:
  - Sentence integrity
  - Bracket pairs (「」, （）, 《》, [], (), {})
  - Line breaks
- 📏 Configurable length settings:
  - Threads mode (500 characters)
  - Custom length mode
- 🌐 Multilingual support:
  - English (default)
  - Traditional Chinese
  - Simplified Chinese
  - Japanese
- 📋 Copy to clipboard functionality
- 🔢 Character count display
- 🔗 Language selection via URL parameter

## Usage

1. Select your preferred language (or use URL parameter `?lang=zh-TW`)
2. Choose length mode:
   - Threads (500 characters)
   - Custom length
3. Input your text
4. Click "Split Text"
5. Copy individual segments using the copy button

## Smart Splitting Rules

The application follows these rules when splitting text:

1. Respects maximum length limit (including prefix)
2. Never splits within bracket pairs
3. Prioritizes splitting at:
   - Line breaks
   - Chinese periods (。)
   - English periods (.)
4. Adds "(n/m)" prefix for multiple segments
5. Preserves sentence integrity where possible

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
