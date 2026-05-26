import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from 'vitest/config'

// https://vite.dev/config/
export default defineConfig({
	base: "/kosen-kensaku/",
	plugins: [react(), tailwindcss()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	build: {
		outDir: "../../docs",
	},
	test: {
    	includeSource: ['src/**/*.{js,ts}'], 
	},
});
