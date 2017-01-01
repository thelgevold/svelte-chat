import rollup from 'rollup';
import babel from 'rollup-plugin-babel';

export default {
  entry: 'src/main.js',
  dest: 'dist/build.js',
  format: 'iife',
  moduleName: 'chat',
  plugins: [
    babel({
      exclude: 'node_modules/**'
    })
  ]
}