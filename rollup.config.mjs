import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import json from '@rollup/plugin-json';
import { sentryRollupPlugin } from '@sentry/rollup-plugin';

export default {
	input: 'src/index.ts',  // Path to your main entry file,
	output: {
		file: 'dist/worker.js',  // Output path for your bundled worker
		format: 'es',  // Cloudflare Workers support ES Modules
		sourcemap: true,
		inlineDynamicImports: true
	},
	plugins: [
		resolve(),  // Resolve node modules
		commonjs(),
		json(),
		typescript({
			tsconfig: './tsconfig.json'
		}),
		terser(),   // Minify the output (optional)
		sentryRollupPlugin({
			authToken: process.env.SENTRY_AUTH_TOKEN,
			org: 'hyperbyte',
			project: 'wilson-coaches',
			debug: true
		})

	]
};
