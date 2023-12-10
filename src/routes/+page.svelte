<script lang="ts">
    import { onMount } from "svelte";
    import Card from "../components/Card.svelte";
    import { cards } from "../components/Cards.js";
    import { ThemeHandler } from "../components/utils.js";
    import Navbar from "../components/Navbar.svelte";
    import ButtonsModal from "../components/ButtonsModal.svelte";

    let themeHandler: ThemeHandler;
    let darkThemeButton: HTMLButtonElement;
    let dirButton: HTMLButtonElement;
    let textDirection: "ltr" | "rtl" = "ltr";
    let isButtonModalShown = false;

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
    ></Navbar>
    <div class="flex flex-col items-center w-full md:w-fit px-5 gap-8">
        {#each cards as card}
            <Card
                {themeHandler}
                header={card.header}
                description={card.description}
                code={card.code}
                items={card.items}
                displayField={card.displayField}
                sort={card.sort}
                textAlignment={card.textAlignment}
                {textDirection}
            ></Card>
        {/each}
    </div>
</div>
