// @flow
import type { Program } from 'acorn';
import type MagicString from 'magic-string';

export type RenderResult = {
  map: Object;
  code: string;
};

export type TransformParams = {
  src: string;
  ast: Program;
  code: MagicString;
};

export type RollupPluginLux = {
  transform(src: string): RenderResult;
};
