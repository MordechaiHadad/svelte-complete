<script lang="ts">
  import { clickOutside } from "./ClickOutside.js";

  export let items: any[] = [];
  export let noResultsMessage = "No results found";

  let containerElement: HTMLDivElement;
  let inputElement: HTMLInputElement;

  let value = "";

  // autocomplete stuff
  let showSuggestionsDiv = false;
  let suggestionsIndex = -1;
  let previousSuggestion: HTMLButtonElement;

  let results = items;
  $: value,
    (results = items.filter((item: string) =>
      item.toLocaleLowerCase().includes(value.toLocaleLowerCase())
    ));

  function boldUnmatchedChars(word: string, value: string) {
    let result = "";
    let i = 0;

    let lowerWord = word.toLowerCase();
    let lowerValue = value.toLowerCase();
    while (i < lowerWord.length) {
      let slice = lowerWord.slice(i, i + lowerValue.length);
      if (slice === lowerValue) {
        result += word.slice(i, i + value.length);
        i += value.length;
      } else {
        result += `<b>${word[i]}</b>`;
        i++;
      }
    }
    return result;
  }

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

    const suggestionContainer =
      inputElement.nextElementSibling as HTMLDivElement;

    if (!suggestionContainer) {
      return;
    }

    const isArrowUp = event.key === "ArrowUp";
    const edgeIndex = isArrowUp ? 0 : suggestionContainer.children.length;

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
    setInactiveSuggestion(previousSuggestion);
    previousSuggestion = element;
  }

  function setInactiveSuggestion(element: HTMLButtonElement) {
    if (!element) {
      return;
    }

    element.classList.remove("active-suggestion");
  }
</script>

<div
  class="relative w-fit"
  id="autocomplete-container"
  use:clickOutside
  on:click-outside={() => (showSuggestionsDiv = false)}
  bind:this={containerElement}
>
  <input
    id="autocomplete-input"
    type="text"
    class="rounded-md border p-2 outline-none focus:border-blue-500 w-60"
    bind:value
    bind:this={inputElement}
    on:focus={() => (showSuggestionsDiv = true)}
    on:keydown={keydownHandler}
    on:input={() => {
      if (!showSuggestionsDiv) {
        showSuggestionsDiv = true;
        suggestionsIndex = -1;
      }
    }}
  />
  {#if showSuggestionsDiv}
    <div class="flex flex-col rounded-md border p-2 absolute top-full mt-1 right-0 left-0 z-50 bg-white">
      {#each results as item, i}
        <button
          class="rounded-md p-2 hover:bg-blue-500/20"
          tabindex="-1"
          on:click={() => (value = item)}
          on:keydown={handleTabbingSuggestions}
        >
          {#if value.length > 0}
            {@html boldUnmatchedChars(item, value)}
          {:else}
            {item}
          {/if}</button
        >
      {:else}
        <p>{noResultsMessage}</p>
      {/each}
    </div>
  {/if}
</div>

<style>
  :global(.active-suggestion) {
    @apply bg-blue-500/20;
  }
</style>