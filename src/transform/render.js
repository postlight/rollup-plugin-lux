// @flow
import type { TransformParams, TransformResult } from './interfaces';

export default function render({ code }: TransformParams): TransformResult {
  return {
    map: code.generateMap(),
    code: code.toString()
  };
}
