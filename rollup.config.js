import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';

export default {
  entry: 'src/index.js',
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**'
    })
  ],
  targets: [
    {
      dest: 'dist/index.js',
      format: 'cjs'
    },
    {
      dest: 'dist/index.es.js',
      format: 'es'
    }
  ],
  external: [
    'eol',
    'path',
    'acorn',
    'magic-string'
  ],
};
