// @flow
import createTransformer from './transform';
import type { RollupPluginLux } from './interfaces';

export default function plugin(appPath: string): RollupPluginLux {
  return {
    transform: createTransformer(appPath)
  };
}
