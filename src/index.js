// @flow
import transform from './transform';
import type { RollupPluginLux } from './interfaces';

export default function plugin(): RollupPluginLux {
  return {
    transform
  };
}
