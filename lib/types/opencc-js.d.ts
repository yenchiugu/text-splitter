declare module 'opencc-js' {
  interface ConverterOptions {
    from?: 'cn' | 'tw' | 'hk' | 'jp' | 'hans' | 'hant';
    to?: 'cn' | 'tw' | 'hk' | 'jp' | 'hans' | 'hant';
  }

  type Converter = (options: ConverterOptions) => (text: string) => string;

  export const Converter: Converter;
} 