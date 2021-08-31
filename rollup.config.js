import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import typescript from '@rollup/plugin-typescript'

export default {
    input: 'src/index.ts',
    output: {
        file: 'assets/js/index.js',
        format: 'iife'
    },
    plugins: [
        resolve(),
        typescript(),
        babel({ babelHelpers: 'bundled' })
    ],
    watch: {
        buildDelay: 10
    }
}