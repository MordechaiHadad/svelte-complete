<script lang="ts">
    import Autocomplete from "$lib/Autocomplete.svelte";
    import Highlight from "svelte-highlight";
    import html from "svelte-highlight/languages/xml";
    import atomDark from "svelte-highlight/styles/atom-one-dark";
    import type { ThemeHandler } from "./utils.js";
    import { slide } from "svelte/transition";

    export let themeHandler: ThemeHandler;
    export let header: string;
    export let description: string;
    export let code: string;
    export let items: string[] | object[] = [];
    export let sort: "ascend" | "descend" | ((a: any, b: any) => number) =
        "ascend";
    export let displayField: string = "";
    export let textDirection: "ltr" | "rtl" = "ltr";
    export let textAlignment: "left" | "center" | "right" =
        textDirection === "ltr" ? "left" : "right";

    let isCollapsed = false;
    let width = 0;
    let component: HTMLDivElement;

    function collapse() {
        width = component.clientWidth;
        component.style.width = isCollapsed ? "100%" : width + "px"; // set this so when the containers are collapsed they will stay at the same size as before
        isCollapsed = !isCollapsed;
    }
</script>

<svelte:head>
    {@html atomDark}
</svelte:head>

<div
    class="card shadow-card-shadow-light dark:shadow-card-shadow-dark p-4 md:p-6 border-neutral-200 dark:border-neutral-800"
    bind:this={component}
>
    <button
        class="flex items-center gap-3 w-full place-content-between cursor-pointer"
        on:click={() => collapse()}
    >
        <p class="text-base md:text-3xl">{header}</p>
        <p
            id="collapse-button"
            class="ti ti-chevron-up self-end text-base md:text-3xl transition-transform duration-200 ease-in-out"
            class:collapsed-icon={isCollapsed}
        ></p>
    </button>
    {#if !isCollapsed}
        <p
            class="text-xs md:text-lg text-left w-full max-w-prose"
            transition:slide
        >
            {description}
        </p>
        <div class="flex flex-col md:flex-row w-full gap-6" transition:slide>
            <Autocomplete
                {items}
                {displayField}
                {sort}
                {textDirection}
                --autocomplete-suggestion-text-alignment={textAlignment}
            />
            <Highlight language={html} {code} />
        </div>
    {/if}
</div>

<style>
    :root {
        --autocomplete-container-width: 100%;
        --autocomplete-input-width: 100%;
    }
    @media (min-width: 768px) {
        :root {
            --autocomplete-container-width: fit-content;
            --autocomplete-input-width: fit-content;
        }
    }
    :global(pre) {
        @apply w-full max-w-md;
    }
    :global(code) {
        @apply rounded-md text-sm;

        @media screen and (min-width: 768px) {
            font-size: 1rem /* 16px */;
            line-height: 1.5rem /* 24px */;
        }
    }
    .card {
        @apply w-full flex flex-col gap-4 items-center rounded-lg border;

        @media screen and (min-width: 520px) and (max-width: 768px) {
            width: min-content;
        }
    }
    .collapsed-icon {
        transform: rotate(180deg);
    }
</style>
