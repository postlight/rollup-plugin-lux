// @flow
import type { Program } from 'acorn';
import type MagicString from 'magic-string';

export type TransformResult = {
  map: Object;
  code: string;
};

export type TransformParams = {
  src: string;
  ast: Program;
  code: MagicString;
};

export type TransformFunction = (src: string, id: string) => TransformResult;
