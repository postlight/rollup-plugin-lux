// @flow
import { parse } from 'acorn';
import MagicString from 'magic-string';

import { PARSER_OPTIONS } from './constants';
import render from './transforms/render';
import staticName from './transforms/static-name';
import { compose } from './utils/compose';
import type {
  RenderResult,
  RollupPluginLux,
  TransformParams
} from './interfaces';

export default function plugin(): RollupPluginLux {
  const transform: (src: string, id?: string) => RenderResult = (
    compose(
      render,
      staticName,
      (src: string): TransformParams => ({
        src,
        ast: parse(src, PARSER_OPTIONS),
        code: new MagicString(src)
      })
    )
  );

  return {
    transform
  };
}
