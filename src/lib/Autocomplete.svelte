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

    export let items: string[] | object[] = [];
    export let noResultsMessage = "No results found";
    export let value = "";
    export let setItemsOnFocus = async (): Promise<any[]> => {
        return [];
    };
    export let sort: "ascend" | "descend" | ((a: any, b: any) => number) =
        "ascend";
    export let highlightCharacters: "matched" | "unmatched" = "matched";
    export let displayField = "";
    export let textAlignment: "left" | "center" | "right" = "left";

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
            items = sortItems(items, sort);
        }
    });
</script>

<link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"
/>

<div
    class="autocomplete-container"
    id="autocomplete-container"
    use:clickOutside
    on:click-outside={() => (showSuggestionsDiv = false)}
    bind:this={containerElement}
>
    <input
        id="autocomplete-input"
        type="text"
        class="autocomplete-input"
        bind:value
        bind:this={inputElement}
        on:focus={async () => {
            showSuggestionsDiv = true;
            const result = await setItemsOnFocus();

            if (items.length === 0 && result.length > 0) {
                items = sortItems(result, sort);
            }
        }}
        on:keydown={keydownHandler}
        on:input={async () => {
            if (!showSuggestionsDiv) {
                showSuggestionsDiv = true;
            }

            await setAllInactive();
        }}
    />
    <span
        class="material-symbols-outlined autocomplete-input-icon"
        tabindex="-1"
    >
        expand_more
    </span>
    {#if showSuggestionsDiv}
        <div id="suggestions-list" class="suggestions-list">
            {#each results as item, i}
                <button
                    class="suggestion"
                    style="text-align: {textAlignment};"
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
                <p>{noResultsMessage}</p>
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
        --autocomplete-suggestion-color: var(--autocomplete-text-color);
    }
    :global(.autocomplete-container) {
        position: relative;
        width: var(--autocomplete-container-width);
        height: var(--autocomplete-container-height);
    }
    :global(.autocomplete-input) {
        padding-left: var(--autocomplete-input-x-padding);
        padding-right: calc(var(--autocomplete-input-x-padding) + 1.5rem);
        padding-top: var(--autocomplete-input-y-padding);
        padding-bottom: var(--autocomplete-input-y-padding);
        width: var(--autocomplete-input-width);
        border-radius: 0.375rem;
        border-width: 1px;
        outline: 2px solid transparent;
        outline-offset: 2px;
        color: var(--autocomplete-text-color);
    }
    :global(.autocomplete-input:focus) {
        border-color: var(--autocomplete-input-focus-border-color);
    }
    :global(.autocomplete-input-icon) {
        color: var(--autocomplete-input-icon-color);
        transform: translateY(-50%);
        position: absolute;
        top: 50%;
        right: 0.5rem;
        user-select: none;
        transition-property: transform;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        transition-duration: 200ms;
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
        z-index: 50;
        background-color: var(--autocomplete-suggestions-list-background-color);
        overflow-y: auto;
        overflow-x: hidden;
        max-height: 10rem;
        color: var(--autocomplete-text-color);
    }
    :global(.suggestion) {
        color: var(--autocomplete-suggestion-color);
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
