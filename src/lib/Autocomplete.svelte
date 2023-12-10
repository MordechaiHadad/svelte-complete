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
    export let textDirection: "ltr" | "rtl" = "ltr";
    export let textAlignment: "left" | "center" | "right" =
        textDirection === "ltr" ? "left" : "right";
    const explicitTextAlignment = textAlignment;
    let isInitialized = false;

    $: {
        if (isInitialized) {
            textAlignment = textDirection === "ltr" ? "left" : "right";
        }
        isInitialized = true;
    }

    let containerElement: HTMLDivElement;
    let inputElement: HTMLInputElement;

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

        const suggestionContainer = inputElement.parentElement?.querySelector(
            "#suggestions-list"
        ) as HTMLDivElement;

        if (!suggestionContainer) {
            return;
        }

        const isArrowUp = event.key === "ArrowUp";
        const edgeIndex = isArrowUp
            ? 0
            : suggestionContainer.children.length - 1;

        if (suggestionsIndex === edgeIndex) {
            suggestionsIndex = isArrowUp
                ? suggestionContainer.children.length
                : -1;
        }

        const direction = isArrowUp ? -1 : 1;
        const activeSuggestionIndex = suggestionsIndex + direction;
        const activeSuggestionElement = suggestionContainer.children[
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
    <input
        id="autocomplete-input"
        type="text"
        class="autocomplete-input"
        class:autocomplete-input-padding-lrt={textDirection === "ltr"}
        class:autocomplete-input-padding-rtl={textDirection === "rtl"}
        bind:value
        bind:this={inputElement}
        on:focus={async () => {
            showSuggestionsDiv = true;

            let result = await setItemsOnFocus();
            if (result.length > 0) items = await setItemsOnFocus();

            if (result.length > 0) sortItems(items, sort);
        }}
        on:keydown={keydownHandler}
        on:input={async () => {
            if (!showSuggestionsDiv) showSuggestionsDiv = true;

            await setAllInactive();
        }}
    />
    <button
        class="material-symbols-outlined autocomplete-input-icon"
        style={textDirection == "rtl" ? "left: 0.5rem" : "right: 0.5rem"}
        tabindex="-1"
        on:click={async () => {
            showSuggestionsDiv = true;

            let result = await setItemsOnFocus();
            if (result.length > 0) items = await setItemsOnFocus();

            if (result.length > 0) sortItems(items, sort);

            inputElement.focus(); // steal focus yay
        }}
    >
        expand_more
    </button>
    {#if showSuggestionsDiv}
        <div id="suggestions-list" class="suggestions-list" transition:slide>
            {#each results as item, i}
                <button
                    class="suggestion"
                    style="text-align: {explicitTextAlignment === 'center'
                        ? explicitTextAlignment
                        : textAlignment};"
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
        --autocomplete-input-width: 15rem;
        --autocomplete-input-focus-border-color: rgb(59 130 246);
        --autocomplete-active-suggestion-background-color: rgb(
            59 130 246 / 0.2
        );
        --autocomplete-suggestions-list-background-color: rgb(255 255 255);
        --autocomplete-input-icon-color: var(--autocomplete-text-color);
        --autocomplete-suggestion-text-color: var(--autocomplete-text-color);
        --autocomplete-no-results-text--color: rgb(64 64 64);
        --autocomplete-suggestions-list-z-index: 10;
    }
    :global(.autocomplete-container) {
        position: relative;
        width: var(--autocomplete-container-width);
        height: var(--autocomplete-container-height);
    }
    :global(.autocomplete-input) {
        padding-top: var(--autocomplete-input-y-padding);
        padding-bottom: var(--autocomplete-input-y-padding);
        width: var(--autocomplete-input-width);
        border-radius: 0.375rem;
        border-width: 1px;
        outline: 2px solid transparent;
        outline-offset: 2px;
        color: var(--autocomplete-text-color);
    }
    :global(.autocomplete-input-padding-lrt) {
        padding-right: calc(var(--autocomplete-input-x-padding) + 1.5rem);
        padding-left: var(--autocomplete-input-x-padding);
    }
    :global(.autocomplete-input-padding-rtl) {
        padding-left: calc(var(--autocomplete-input-x-padding) + 1.5rem);
        padding-right: var(--autocomplete-input-x-padding);
    }
    :global(.autocomplete-input:focus) {
        border-color: var(--autocomplete-input-focus-border-color);
    }
    :global(.autocomplete-input-icon) {
        color: var(--autocomplete-input-icon-color);
        transform: translateY(-50%);
        position: absolute;
        top: 50%;
        user-select: none;
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
    }
    :global(.suggestion) {
        color: var(--autocomplete-suggestion-text-color);
        border-radius: 0.375rem;
        padding: 0.5rem;
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
