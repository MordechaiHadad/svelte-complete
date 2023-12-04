/// <reference types="vitest" />

import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [sveltekit()],
    test: {
        include: ["**t/*.{js,ts}"],
    },
});
