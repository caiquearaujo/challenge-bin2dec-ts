import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript';

module.exports = [
	{
		input: 'src/index.ts',
		output: {
			file: 'dev/dist/bin2dec.js',
			name: 'bin2dec',
			format: 'umd',
		},
		plugins: [resolve(), typescript()],
	},
];
