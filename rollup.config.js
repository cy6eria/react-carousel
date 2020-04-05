import postcss from "rollup-plugin-postcss";
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import url from '@rollup/plugin-url';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import replace from "rollup-plugin-replace";
import pkg from './package.json';

const makeExternalPredicate = externalArr => {
  if (externalArr.length === 0) {
    return () => false
  }
  const pattern = new RegExp(`^(${externalArr.join('|')})($|/)`)
  return id => pattern.test(id)
}

const config = {
  input: "src/index.ts",
}

const postcssConfig = {
  extract: false,
  modules: true,
  autoModules: true,
  plugins: [],
  minimize: true,
  sourceMap: true
}

const external = makeExternalPredicate([
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
])

const umd = Object.assign({}, config, {
  output: {
    file: 'dist/react-carousel.dev.js',
    format: 'umd',
    name: "ReactCarousel",
    exports: "named",
    globals: { react: "React" },
    sourcemap: true,
  },
  external: ["react", "react-dom"],
  plugins: [
    resolve(),
    postcss(postcssConfig),
    json(),
    commonjs(),
    typescript(),
    replace({
      "process.env.NODE_ENV": JSON.stringify("development"),
    }),
  ],
})

const umdProd = Object.assign({}, umd, {
  output: Object.assign({}, umd.output, {
    file: 'dist/react-carousel.js',
  }),
  plugins: [
    postcss(postcssConfig),
    json(),
    url(),
    typescript(),
    resolve(),
    commonjs(),
    replace({
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
    terser(),
  ],
})

const cjs = Object.assign({}, config, {
  output: {
    file: 'dist/react-carousel.cjs.js',
    format: 'cjs',
    exports: "named",
    sourcemap: true,
  },
  plugins: [
    postcss(postcssConfig),
    json(),
    url(),
    typescript(),
    resolve(),
    commonjs(),
    terser(),
  ],
  external,
})

const es = Object.assign({}, config, {
  output: {
    file: 'dist/react-carousel.es.js',
    format: 'es',
    exports: "named",
    sourcemap: true,
  },
  plugins: [
    postcss(postcssConfig),
    json(),
    url(),
    typescript(),
    resolve(),
    commonjs(),
    terser(),
  ],
  external,
})

export default [umd, umdProd, es, cjs];
