import adapter from '@sveltejs/adapter-auto';
import dsv from '@rollup/plugin-dsv';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),

		vite: {
			plugins: [dsv()]
		}
	}
};

export default config;
