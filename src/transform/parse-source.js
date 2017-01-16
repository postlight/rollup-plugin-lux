// @flow
import { parse } from 'acorn';
import MagicString from 'magic-string';

import { PARSER_OPTIONS } from '../constants';

import type { TransformParams } from './interfaces';

export default function parseSource(src: string): TransformParams {
  return {
    src,
    ast: parse(src, PARSER_OPTIONS),
    code: new MagicString(src)
  };
}
