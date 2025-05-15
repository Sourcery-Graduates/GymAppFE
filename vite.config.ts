import { defineConfig } from 'vite';
import { configDefaults } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(() => ({
	plugins: [react()],
	base: '/',
	server: {
		port: 3000,
	},
	resolve: {
		alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
	},
	test: {
		environment: 'jsdom',
		globals: true,
		exclude: [...configDefaults.exclude, 'e2e'],
		setupFiles: 'src/setupTests.ts'
	}
}));
