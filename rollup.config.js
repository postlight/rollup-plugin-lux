import babel from 'rollup-plugin-babel';

export default {
  entry: 'src/index.js',
  plugins: [
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
    'acorn'
  ],
};
