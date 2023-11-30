/** @type {import('tailwindcss').Config} */
export default {
    darkMode: "class",
    content: ["./src/**/*.{html,js,svelte,ts}"],
    theme: {
        extend: {
            colors: {
                "svelte-brand": "#FF794C",
            },
            boxShadow: {
                "card-shadow-light":
                    "5px 5px 13px 0px rgba(196, 196, 196, 0.9), -5px -5px 10px 0px rgba(255, 255, 255, 0.9), 5px -5px 10px 0px rgba(196, 196, 196, 0.2), -5px 5px 10px 0px rgba(196, 196, 196, 0.2), -1px -1px 2px 0px rgba(196, 196, 196, 0.5) inset, 1px 1px 2px 0px rgba(255, 255, 255, 0.3) inset;",
                "card-shadow-dark":
                    "5px 5px 13px 0px rgba(30, 30, 30, 0.9), -5px -5px 10px 0px rgba(46, 46, 46, 0.9), 5px -5px 10px 0px rgba(30, 30, 30, 0.2), -5px 5px 10px 0px rgba(30, 30, 30, 0.2), -1px -1px 2px 0px rgba(30, 30, 30, 0.5) inset, 1px 1px 2px 0px rgba(46, 46, 46, 0.3) inset;",
            },
        },
    },
    plugins: [],
};
