<script lang="ts">
  import { onMount } from "svelte";
  import { clickOutside } from "./ClickOutside.js";
  import {
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
  export let sort:
    | "ascend"
    | "descend"
    | undefined
    | ((a: any, b: any) => number) = undefined;

  export let displayField = "";

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
    const edgeIndex = isArrowUp ? 0 : suggestionContainer.children.length - 1;

    if (suggestionsIndex === edgeIndex) {
      suggestionsIndex = isArrowUp ? suggestionContainer.children.length : -1;
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
  <span class="material-symbols-outlined autocomplete-input-icon" tabindex="-1">
    expand_more
  </span>
  {#if showSuggestionsDiv}
    <div id="suggestions-list" class="suggestions-list">
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
            {@html boldUnmatchedChars(display(displayField, item), value)}
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
    --autocomplete-input-y-padding: 0.5rem;
    --autocomplete-input-x-padding: 0.5rem;
    --autocomplete-input-width: 15rem;
    --autocomplete-input-border-color: rgb(59 130 246);
    --autocomplete-active-suggestion-background-color: rgb(59 130 246 / 0.2);
  }
  :global(.autocomplete-container) {
    @apply relative w-fit;
  }
  :global(.autocomplete-input) {
    @apply rounded-md border outline-none;
    padding-left: var(--autocomplete-input-x-padding);
    padding-right: calc(var(--autocomplete-input-x-padding) + 1.5rem);
    padding-top: var(--autocomplete-input-y-padding);
    padding-bottom: var(--autocomplete-input-y-padding);
    width: var(--autocomplete-input-width);
  }
  :global(.autocomplete-input:focus) {
    border-color: var(--autocomplete-input-border-color);
  }
  :global(.autocomplete-input-icon) {
    transform: translateY(-50%);
    @apply absolute top-1/2 right-2 select-none;
  }
  :global(.suggestions-list) {
    @apply flex flex-col rounded-md border p-2 absolute top-full mt-1 right-0 left-0 z-50 bg-white overflow-y-auto overflow-x-hidden max-h-40;
  }
  :global(.suggestion) {
    @apply rounded-md p-2;
  }
  :global(.suggestion:hover) {
    background-color: var(--autocomplete-active-suggestion-background-color);
  }
  :global(.active-suggestion) {
    background-color: var(--autocomplete-active-suggestion-background-color);
  }
</style>
