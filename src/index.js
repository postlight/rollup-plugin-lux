// @flow
import path from 'path';

import createTransformer from './transform';
import type { TransformFunction } from './transform';

export type RollupPluginLux = {
  transform: TransformFunction;
};

const ALIAS = /^(?:external!)?((?:app|config|db)\/.+)$/;
const LUX_LOCAL = 'LUX_LOCAL';

type ResolveOptions = {
  local: string;
  project: string;
};

export function resolve({ local, project }: ResolveOptions): RollupPluginLux {
  return {
    resolveId: importee => {
      if (importee === LUX_LOCAL) {
        return local;
      }

      if (ALIAS.test(importee)) {
        const parts = importee.replace(ALIAS, '$1').split(path.posix.sep);
        let resolved = path.join(project, ...parts);

        if (!path.extname(resolved)) {
          resolved += '.js';
        }

        return resolved;
      }

      return undefined;
    }
  };
}

export function transform(appPath: string): RollupPluginLux {
  return {
    transform: createTransformer(appPath)
  };
}
