<script lang="ts">
    import { onMount } from "svelte";
    import { ThemeHandler } from "../components/utils.js";
    import Navbar from "../components/Navbar.svelte";
    import ButtonsModal from "../components/ButtonsModal.svelte";
    import ExamplesTab from "../components/ExamplesTab.svelte";
    import PropertiesTab from "../components/PropertiesTab.svelte";

    let themeHandler: ThemeHandler;
    let darkThemeButton: HTMLButtonElement;
    let dirButton: HTMLButtonElement;
    let textDirection: "ltr" | "rtl" = "ltr";
    let isButtonModalShown = false;
    let activeTabIndex = 0;

    function toggleTextDir() {
        if (textDirection === "ltr") {
            dirButton.classList.remove("ti-text-direction-rtl");
            dirButton.classList.add("ti-text-direction-ltr");
            textDirection = "rtl";
            return;
        }
        dirButton.classList.remove("ti-text-direction-ltr");
        dirButton.classList.add("ti-text-direction-rtl");
        textDirection = "ltr";
    }

    onMount(() => {
        const isDarkTheme = window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches;
        darkThemeButton = document.getElementById(
            "theme-button"
        )! as HTMLButtonElement;
        themeHandler = new ThemeHandler(isDarkTheme, darkThemeButton);
    });
</script>

<div
    class="text-neutral-900 dark:text-neutral-100 pb-8 flex flex-col items-center justify-center gap-6"
>
    {#if isButtonModalShown}
        <ButtonsModal
            {themeHandler}
            bind:dirButton
            {toggleTextDir}
            bind:isButtonModalShown
            bind:textDirection
        ></ButtonsModal>
    {/if}
    <Navbar
        bind:dirButton
        {themeHandler}
        bind:textDirection
        {toggleTextDir}
        bind:isButtonModalShown
        bind:activeTabIndex
    ></Navbar>
    {#if activeTabIndex === 0}
        <ExamplesTab bind:textDirection {themeHandler}></ExamplesTab>
    {:else if activeTabIndex === 1}
    <PropertiesTab></PropertiesTab>
    {/if}
</div>
