// @flow
import { compose } from '../utils/compose';

import render from './render';
import staticName from './static-name';
import parseSource from './parse-source';
import type { TransformFunction } from './interfaces';

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

export type { TransformFunction } from './interfaces';
