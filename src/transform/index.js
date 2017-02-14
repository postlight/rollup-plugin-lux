// @flow
import type { Program } from 'acorn';
import type MagicString from 'magic-string';

import { compose } from '../utils/compose';

import render from './render';
import staticName from './static-name';
import parseSource from './parse-source';

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

const transformer = compose(
  render,
  staticName,
  parseSource
);

export default function createTransformer(appPath: string): TransformFunction {
  return (src, id) => (
    id.startsWith(appPath) ? transformer(src) : render(parseSource(src))
  );
}
