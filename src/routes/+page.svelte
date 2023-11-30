<script lang="ts">
  import { onMount } from "svelte";
  import Card from "../components/Card.svelte";
  import { cards } from "../components/Cards.js";
  import { ThemeHandler } from "../components/utils.js";
  import { goto } from "$app/navigation";

  let themeHandler: ThemeHandler;
  let darkThemeButton: HTMLButtonElement;

  onMount(() => {
    const isDarkTheme = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    darkThemeButton = document.getElementById("theme-button")! as HTMLButtonElement;
    themeHandler = new ThemeHandler(isDarkTheme, darkThemeButton);
  });

</script>

<div
  class="text-neutral-900 dark:text-neutral-100 pt-8 flex flex-col items-center justify-center gap-6"
>
  <div
    class="flex gap-4 flex-col items-center justify-center md:flex-row md:gap-8 w-fit"
  >
    <div
      class="hidden w-[calc(24px+theme(gap.3)+theme(fontSize.3xl.0))] md:block"
    ></div>
    <p class="text-3xl md:text-4xl font-bold">
      <span class="text-svelte-brand">Svelte</span> Complete
    </p>
    <div class="flex items-center text-2xl md:text-3xl gap-3">
      <button class="ti ti-brand-github hover:text-svelte-brand" on:click={() => goto("https://github.com/MordechaiHadad/svelte-complete")}></button>
      <button id="theme-button" class="ti hover:text-svelte-brand" on:click={() => themeHandler.toggle()}></button>
    </div>
  </div>
  <div class="flex flex-col items-center w-full md:w-fit px-5 gap-6">
    {#each cards as card}
      <Card
        {themeHandler}
        header={card.header}
        description={card.description}
        code={card.code}
        items={card.items}
        displayField={card.displayField}
      ></Card>
    {/each}
  </div>
</div>
