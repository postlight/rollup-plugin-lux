// @flow
declare module 'magic-string' {
  declare class MagicString {
    constructor(str: string): MagicString;
    appendLeft(index: number, content: string): void;
    appendRight(index: number, content: string): void;
    prependLeft(index: number, content: string): void;
    prependRight(index: number, content: string): void;

    generateMap(opts?: {
      file?: string;
      hires?: boolean;
      source?: string;
      includeContent?: boolean;
    }): {
      [key: string]: string;
      toUrl(): string;
      toString(): string;
    };
  }

  declare var exports: Class<MagicString>;
}
