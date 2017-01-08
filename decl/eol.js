// @flow
declare module 'eol' {
  declare var exports: {
    lf(text: string): string;
    cr(text: string): string;
    crlf(text: string): string;
    auto(text: string): string;
    before(text: string): string;
    after(text: string): string;
  };
}
