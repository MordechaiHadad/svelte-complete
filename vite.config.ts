/// <reference types="vitest" />

import { sveltekit } from "@sveltejs/kit/vite";
// import { defineConfig } from "vite";
import { defineConfig } from 'vitest/config';

export default defineConfig({
    plugins: [sveltekit()],
    test: {
        include: ['**/*.{test,spec}.?(c|m)[jt]s?(x)'],
    },
});
