import { uglify } from 'rollup-plugin-uglify';
import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript';

module.exports = [
	{
		input: 'src/index.ts',
		output: {
			file: 'dist/bin2dec.js',
			name: 'bin2dec',
			format: 'umd',
		},
		plugins: [resolve(), typescript()],
	},
	{
		input: 'src/index.ts',
		output: {
			file: 'dist/bin2dec.min.js',
			name: 'bin2dec',
			format: 'umd',
		},
		plugins: [resolve(), typescript(), uglify()],
	},
];
