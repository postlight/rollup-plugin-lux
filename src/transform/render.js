// @flow
import type { TransformParams, TransformResult } from './index';

export default function render({ code }: TransformParams): TransformResult {
  return {
    map: code.generateMap(),
    code: code.toString()
  };
}
