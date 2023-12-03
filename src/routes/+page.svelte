<script lang="ts">
    import { onMount } from "svelte";
    import Card from "../components/Card.svelte";
    import { cards } from "../components/Cards.js";
    import { ThemeHandler } from "../components/utils.js";
    import { goto } from "$app/navigation";

    let themeHandler: ThemeHandler;
    let darkThemeButton: HTMLButtonElement;
    let dirButton: HTMLButtonElement;
    let textDirection: "ltr" | "rtl" = "ltr";

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
    class="text-neutrl-900 dark:text-neutral-100 pb-8 flex flex-col items-center justify-center gap-6"
>
    <div
        class="flex gap-4 flex-col items-center justify-center md:flex-row md:gap-8 w-full sticky top-0 bg-neutral-100/60 dark:bg-neutral-900/60 backdrop-blur z-50 py-4"
    >
        <div
            class="hidden w-[calc(24px+theme(gap.3)+theme(fontSize.3xl.0))] md:block"
        ></div>
        <p class="text-3xl md:text-4xl font-bold">
            <span class="text-svelte-brand">Svelte</span> Complete
        </p>
        <div class="flex items-center text-2xl md:text-3xl gap-4">
            <button
                class="ti ti-brand-github p-1 rounded-md border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-800 shadow-neutral-300 dark:shadow-neutral-700 hover:shadow-md transition-all duration-300 ease-in-out"
                title="Go to github repository"
                on:click={() =>
                    goto("https://github.com/MordechaiHadad/svelte-complete")}
            ></button>
            <button
                id="theme-button"
                class="ti p-1 rounded-md border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-800 shadow-neutral-300 dark:shadow-neutral-700 hover:shadow-md transition-all duration-300 ease-in-out"
                title="Toggle between dark/light theme"
                on:click={() => themeHandler.toggle()}
            ></button>
            <button
                class="ti ti-text-direction-rtl p-1 rounded-md border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-800 shadow-neutral-300 dark:shadow-neutral-700 hover:shadow-md transition-all duration-300 ease-in-out"
                bind:this={dirButton}
                title="Toggle between LTR/RTL"
                on:click={toggleTextDir}
            ></button>
        </div>
    </div>
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
