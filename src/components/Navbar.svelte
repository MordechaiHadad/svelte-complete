<script lang="ts">
    import type { ThemeHandler } from "./utils.js";
    import { goto } from "$app/navigation";
    import Button from "./Button.svelte";

    export let themeHandler: ThemeHandler;
    export let dirButton: HTMLButtonElement;
    export let toggleTextDir;
    export let textDirection: "ltr" | "rtl";
    export let isButtonModalShown: boolean;
</script>

<div
    class="flex gap-4 items-center px-6 justify-between md:px-12 lg:px-32 md:gap-8 w-full sticky top-0 bg-neutral-100/60 dark:bg-neutral-900/60 backdrop-blur z-20 py-4 text-2xl"
>
    <p class="text-2xl md:text-4xl font-bold">
        <span class="text-svelte-brand">Svelte</span> Complete
    </p>
    <Button
        icon="ti-dots-vertical"
        title="open menu"
        class="md:hidden"
        callback={() => {isButtonModalShown = !isButtonModalShown}}
    ></Button>

    <div class="items-center gap-4 hidden md:flex">
        <div
            class="flex text-lg font-semibold gap-4 text-neutral-700 dark:text-neutral-300"
        >
            <button>Examples</button>
            <button>Properties</button>
        </div>
        <div
            class="flex gap-4 border-l pl-4 border-neutral-300 dark:border-neutral-700"
        >
            <Button
                title="Go to github repository"
                icon="ti-brand-github"
                callback={() =>
                    goto("https://github.com/MordechaiHadad/svelte-complete")}
            ></Button>
            <Button
                id="theme-button"
                callback={() => themeHandler.toggle()}
                title="Toggle between dark/light theme"
            ></Button>
            <Button
                icon="ti-text-direction-rtl"
                bind:button={dirButton}
                title="Toggle between LTR/RTL"
                callback={toggleTextDir}
            ></Button>
        </div>
    </div>
</div>
