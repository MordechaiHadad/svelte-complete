<script lang="ts">
  import Autocomplete from "$lib/Autocomplete.svelte";
  import Highlight from "svelte-highlight";
  import html from "svelte-highlight/languages/xml";
  import github from "svelte-highlight/styles/atom-one-light";

  export let header: string;
  export let description: string;
  export let code: string;
  export let items: string[] | object[] = [];
  export let sort:
    | "ascend"
    | "descend"
    | undefined
    | ((a: any, b: any) => number) = undefined;
  export let displayField: string = "";

  let isCollapsed = false;
</script>

<svelte:head>
  {@html github}
</svelte:head>

<div class="card">
  <div class="flex flex-col items-center gap-3 w-full">
    <button class="ti ti-chevron-up self-end text-base md:text-3xl" on:click={() => isCollapsed = !isCollapsed}> </button>
    <div class="flex flex-row gap-4 w-full place-content-between">
      <p class="text-base md:text-3xl">{header}</p>
      <button
        class="bg-neutral-200 text-neutral-900 text-xs rounded-md px-3 py-1 md:text-xl md:px-4 md:py-2"
        >Toggle RTL</button
      >
    </div>
  </div>
  {#if !isCollapsed}
  <p class="text-xs md:text-lg text-left w-full md:max-w-prose">
    {description}
  </p>
  <div class="flex flex-col md:flex-row w-full gap-6">
    <Autocomplete {items} {displayField} />
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
    width: 100%;

    @media (min-width: 768px) {
      width: fit-content;
    }
  }
  :global(code) {
    @apply rounded-md text-base;
  }
  .card {
    @apply w-full flex flex-col gap-4 items-center rounded-lg p-4;
    box-shadow:
      5px 5px 13px 0px rgba(196, 196, 196, 0.9),
      -5px -5px 10px 0px rgba(255, 255, 255, 0.9),
      5px -5px 10px 0px rgba(196, 196, 196, 0.2),
      -5px 5px 10px 0px rgba(196, 196, 196, 0.2),
      -1px -1px 2px 0px rgba(196, 196, 196, 0.5) inset,
      1px 1px 2px 0px rgba(255, 255, 255, 0.3) inset;
  }
</style>
