<script lang="ts">
    import { onMount } from "svelte";
    import { clickOutside } from "./ClickOutside.js";
    import {
        boldMatchedChars,
        boldUnmatchedChars,
        display,
        filterOnChange,
        returnNewValue,
        sortItems,
    } from "./modules.js";
    import { slide } from "svelte/transition";

    export let items: string[] | object[] = [];
    export let noResultsMessage = "No results found";
    export let value = "";
    export let setItemsOnFocus = async (): Promise<any[]> => {
        return [];
    }; // This function basically sets items not on instantiation of autocomplete but rather when input element gets focused.
    export let sort: "ascend" | "descend" | ((a: any, b: any) => number) =
        "ascend";
    export let highlightCharacters: "matched" | "unmatched" = "matched";
    export let displayField = "";
    export let textDirection: "ltr" | "rtl" | "auto" = "auto";
    export let readonly = false;

    let containerElement: HTMLDivElement;
    let inputElement: HTMLInputElement;
    let suggestionsContainerElement: HTMLDivElement;

    // autocomplete stuff
    let showSuggestionsDiv = false;
    let suggestionsIndex = -1;
    let previousSuggestion: HTMLButtonElement;

    let results = items;
    $: value, (results = filterOnChange(displayField, items, value));

    function keydownHandler(event: KeyboardEvent) {
        // Handle esc key
        if (event.key === "Escape") {
            showSuggestionsDiv = false;
            suggestionsIndex = -1;
        }

        if (event.key === "Tab") {
            showSuggestionsDiv = false;
        }

        if (event.key === "Enter") {
            event.preventDefault();
            previousSuggestion.click();
            showSuggestionsDiv = false;
            suggestionsIndex = -1;
        }

        handleTabbingSuggestions(event);
    }

    function handleTabbingSuggestions(event: KeyboardEvent) {
        const targets = ["ArrowUp", "ArrowDown"];
        if (!targets.includes(event.key)) {
            return;
        }

        event.preventDefault();

        if (!suggestionsContainerElement) {
            return;
        }

        const isArrowUp = event.key === "ArrowUp";
        const edgeIndex = isArrowUp
            ? 0
            : suggestionsContainerElement.children.length - 1;

        if (suggestionsIndex === edgeIndex) {
            suggestionsIndex = isArrowUp
                ? suggestionsContainerElement.children.length
                : -1;
        }

        const direction = isArrowUp ? -1 : 1;
        const activeSuggestionIndex = suggestionsIndex + direction;
        const activeSuggestionElement = suggestionsContainerElement.children[
            activeSuggestionIndex
        ] as HTMLButtonElement;

        if (activeSuggestionElement) {
            setActiveSuggestion(activeSuggestionElement);
            suggestionsIndex = activeSuggestionIndex;
            return;
        }
    }

    function setActiveSuggestion(element: HTMLButtonElement) {
        element.classList.add("active-suggestion");
        element.scrollIntoView({ block: "nearest" });
        setInactiveSuggestion(previousSuggestion);
        previousSuggestion = element;
    }

    function setInactiveSuggestion(element: HTMLButtonElement) {
        if (!element) {
            return;
        }

        element.classList.remove("active-suggestion");
    }

    async function setAllInactive() {
        await Promise.resolve();
        if (suggestionsIndex >= results.length) {
            suggestionsIndex = -1;
            setInactiveSuggestion(previousSuggestion);
        }
    }

    async function toggleSuggestions() {
        if (showSuggestionsDiv && value === "") {
            showSuggestionsDiv = false;
            return;
        }

        let result = await setItemsOnFocus();
        if (result.length > 0) items = await setItemsOnFocus();

        if (result.length > 0) sortItems(items, sort);

        inputElement.focus(); // steal focus yay

        if (results.length === 1) results = items;
        showSuggestionsDiv = true;
    }

    onMount(() => {
        if (sort && items.length > 0) {
            sortItems(items, sort);
        }
    });
</script>

<link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"
/>

<div
    class="autocomplete-container"
    dir={textDirection}
    id="autocomplete-container"
    use:clickOutside
    on:click-outside={() => (showSuggestionsDiv = false)}
    bind:this={containerElement}
>
    <div
        class="autocomplete-input-container"
        class:autocomplete-focused-input-container={showSuggestionsDiv}
        on:click={toggleSuggestions}
    >
        <input
            id="autocomplete-input"
            type="text"
            class="autocomplete-input"
            bind:value
            bind:this={inputElement}
            {readonly}
            on:click|stopPropagation={toggleSuggestions}
            on:focusin={() => inputElement.select()}
            on:keydown={keydownHandler}
            on:input={async () => {
                if (!showSuggestionsDiv) showSuggestionsDiv = true;

                await setAllInactive();
            }}
        />
        <button
            class="material-symbols-outlined autocomplete-input-icon"
            tabindex="-1"
            class:autocomplete-collapsed-input-icon={showSuggestionsDiv}
        >
            expand_more
        </button>
    </div>
    {#if showSuggestionsDiv}
        <div
            bind:this={suggestionsContainerElement}
            class="suggestions-list"
            transition:slide
        >
            {#each results as item, i}
                <button
                    class="suggestion"
                    tabindex="-1"
                    on:click={() => {
                        value = returnNewValue(item, displayField);
                        showSuggestionsDiv = false;
                    }}
                    on:keydown={handleTabbingSuggestions}
                >
                    {#if value.length > 0}
                        {@html highlightCharacters == "matched"
                            ? boldMatchedChars(
                                  display(displayField, item),
                                  value
                              )
                            : boldUnmatchedChars(
                                  display(displayField, item),
                                  value
                              )}
                    {:else}
                        {display(displayField, item)}
                    {/if}</button
                >
            {:else}
                <p class="no-results">{noResultsMessage}</p>
            {/each}
        </div>
    {/if}
</div>

<style>
    :root {
        --autocomplete-text-color: rgb(23 23 23);
        --autocomplete-container-width: fit-content;
        --autocomplete-container-height: fit-content;
        --autocomplete-input-y-padding: 0.5rem;
        --autocomplete-input-x-padding: 0.5rem;
        --autocomplete-input-width: 100%;
        --autocomplete-active-suggestion-background-color: rgb(
            115 115 115 / 0.2
        );
        --autocomplete-suggestions-list-background-color: rgb(250 250 250);
        --autocomplete-input-icon-color: var(--autocomplete-text-color);
        --autocomplete-suggestion-text-color: var(--autocomplete-text-color);
        --autocomplete-no-results-text--color: rgb(64 64 64);
        --autocomplete-suggestions-list-z-index: 10;
        --autocomplete-input-background-color: rgb(250 250 250);
        --autocomplete-input-border-width: 1px;
        --autocomplete-input-border-color: rgb(115 115 115);
        --autocomplete-input-focus-border-color: var(
            --autocomplete-input-border-color
        );
        --autocomplete-suggestions-list-border-color: var(
            --autocomplete-input-border-color
        );
    }
    :global(.autocomplete-container) {
        position: relative;
        width: var(--autocomplete-container-width);
        height: var(--autocomplete-container-height);
    }
    :global(.autocomplete-input-container) {
        display: flex;
        align-content: space-between;
        background-color: var(--autocomplete-input-background-color);
        padding-top: var(--autocomplete-input-y-padding);
        padding-bottom: var(--autocomplete-input-y-padding);
        padding-left: var(--autocomplete-input-x-padding);
        padding-right: var(--autocomplete-input-x-padding);
        border-radius: 0.375rem;
        border-width: var(--autocomplete-input-border-width);
        border-color: var(--autocomplete-input-border-color);
        width: var(--autocomplete-input-width);
    }
    :global(.autocomplete-input-container:hover) {
        cursor: text;
    }
    :global(.autocomplete-focused-input-container) {
        border-color: var(--autocomplete-input-focus-border-color);
    }
    :global(.autocomplete-input) {
        width: 100%;
        color: var(--autocomplete-text-color);
        background-color: var(--autocomplete-input-background-color);
        outline: none;
    }
    :global(.autocomplete-input-icon) {
        color: var(--autocomplete-input-icon-color);
        user-select: none;
        transition-property: transform;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        transition-duration: 200ms;
    }
    :global(.autocomplete-collapsed-input-icon) {
        transform: rotate(180deg);
    }
    :global(.suggestions-list) {
        display: flex;
        flex-direction: column;
        border-radius: 0.375rem;
        border-width: 1px;
        padding: 0.5rem;
        position: absolute;
        top: 100%;
        margin-top: 0.25rem;
        right: 0px;
        left: 0px;
        z-index: var(--autocomplete-suggestions-list-z-index);
        background-color: var(--autocomplete-suggestions-list-background-color);
        overflow-y: auto;
        overflow-x: hidden;
        max-height: 10rem;
        color: var(--autocomplete-text-color);
        border-color: var(--autocomplete-suggestions-list-border-color);
    }
    :global(.suggestion) {
        color: var(--autocomplete-suggestion-text-color);
        border-radius: 0.375rem;
        padding: 0.5rem;
        text-align: left;
    }
    :global(.suggestion:dir(rtl)) {
        text-align: right;
    }
    :global(.no-results) {
        color: var(--autocomplete-no-results-text-color);
        border-radius: 0.375rem;
        padding: 0.5rem;
    }
    :global(.suggestion:hover) {
        background-color: var(
            --autocomplete-active-suggestion-background-color
        );
    }
    :global(.active-suggestion) {
        background-color: var(
            --autocomplete-active-suggestion-background-color
        );
    }
</style>
