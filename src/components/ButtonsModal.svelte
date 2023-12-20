<script lang="ts">
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import Button from "./Button.svelte";
    import type { ThemeHandler } from "./utils.js";
    import { fade } from "svelte/transition";
    import TabButton from "./TabButton.svelte";

    export let themeHandler: ThemeHandler;
    export let dirButton: HTMLButtonElement | null = null;
    export let textDirection: "ltr" | "rtl";
    export let toggleTextDir;
    export let isButtonModalShown: boolean;
    export let activeTabIndex = 0;
    let darkThemeButton: HTMLButtonElement;

    const toggleTheme = () => {
        themeHandler.toggle();
        darkThemeButton.classList.remove(
            themeHandler.getisDark() ? "ti-moon" : "ti-sun"
        );
        darkThemeButton.classList.add(
            themeHandler.getisDark() ? "ti-sun" : "ti-moon"
        );
    };

    onMount(() => {
        darkThemeButton.classList.add(
            themeHandler.getisDark() ? "ti-sun" : "ti-moon"
        );
    });
</script>

<div
    class="z-50 fixed w-full h-full top-0 left-0 flex justify-center backdrop-blur-sm md:hidden"
>
    <!-- Modal overlay -->
    <button
        class="fixed w-full h-full bg-neutral-200 dark:bg-neutral-800 opacity-50"
        on:click={() => (isButtonModalShown = !isButtonModalShown)}
    />

    <!-- Modal content -->
    <div
        class="bg-neutral-100 dark:bg-neutral-900 absolute top-4 left-5 right-5 rounded-lg shadow-lg flex flex-col p-6 gap-5"
        transition:fade={{ duration: 200 }}
    >
        <div
            class="flex justify-between border-b pb-5 border-neutral-300 dark:border-neutral-700"
        >
            <div
                class="flex flex-col gap-5 items-start justify-center font-semibold"
            >
                <TabButton
                    content="Examples"
                    tabIndex={0}
                    title="Switch to examples tab"
                    bind:activeTabIndex
                ></TabButton>
                <TabButton
                    content="Properties"
                    tabIndex={1}
                    title="Switch to properties tab"
                    bind:activeTabIndex
                ></TabButton>
            </div>
            <Button
                icon="ti-x"
                title="Close modal"
                callback={() => (isButtonModalShown = !isButtonModalShown)}
            ></Button>
        </div>
        <div class="flex gap-8 justify-center text-2xl">
            <Button
                title="Go to github repository"
                icon="ti-brand-github"
                callback={() =>
                    goto("https://github.com/MordechaiHadad/svelte-complete")}
            ></Button>
            <Button
                id="modal-theme-button"
                bind:button={darkThemeButton}
                callback={toggleTheme}
                title="Toggle between dark/light theme"
            ></Button>
            <Button
                icon="ti-text-direction-{textDirection === 'rtl'
                    ? 'ltr'
                    : 'rtl'}"
                bind:button={dirButton}
                title="Toggle between LTR/RTL"
                callback={toggleTextDir}
            ></Button>
        </div>
    </div>
</div>
