// @flow
import type { RenderResult, TransformParams } from '../interfaces';

export default function render({ code }: TransformParams): RenderResult {
  return {
    map: code.generateMap(),
    code: code.toString()
  };
}
