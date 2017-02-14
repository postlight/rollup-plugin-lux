// @flow
import createTransformer from './transform';
import type { TransformFunction } from './transform';

export type RollupPluginLux = {
  transform: TransformFunction;
};

export default function plugin(appPath: string): RollupPluginLux {
  return {
    transform: createTransformer(appPath)
  };
}
