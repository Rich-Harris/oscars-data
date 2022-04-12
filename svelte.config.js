import adapter from '@sveltejs/adapter-auto';
import dsv from '@rollup/plugin-dsv';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),

		prerender: {
			default: true
		},

		vite: {
			plugins: [dsv()]
		}
	}
};

export default config;
