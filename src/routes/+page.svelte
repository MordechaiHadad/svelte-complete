<script lang="ts">
  import Card from "../components/Card.svelte";
  import { cards } from "../components/Cards.js";
</script>

<div
  class="text-neutral-900 pt-8 flex flex-col items-center justify-center gap-6"
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
      <button class="ti ti-brand-github"></button>
      <button class="ti ti-moon"></button>
    </div>
  </div>
  <div class="flex flex-col items-center w-full md:w-fit px-5 gap-6">
    {#each cards as card}
      <Card
        header={card.header}
        description={card.description}
        code={card.code}
        items={card.items}
        displayField={card.displayField}
      ></Card>
    {/each}
  </div>
</div>
