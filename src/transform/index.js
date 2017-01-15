// @flow
import { parse } from 'acorn';
import MagicString from 'magic-string';

import { PARSER_OPTIONS } from '../constants';
import { compose } from '../utils/compose';

import render from './render';
import staticName from './static-name';
import type { TransformParams, TransformResult } from './interfaces';

const transformer = compose(
  render,
  staticName,
  (src: string): TransformParams => ({
    src,
    ast: parse(src, PARSER_OPTIONS),
    code: new MagicString(src)
  })
);

// eslint-disable-next-line no-unused-vars
export default function transform(src: string, id: string): TransformResult {
  return transformer(src);
}
