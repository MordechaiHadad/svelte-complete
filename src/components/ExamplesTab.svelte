<script lang="ts">
    import type { ThemeHandler } from "./utils.js";
    import Card from "./Card.svelte";
    import { cards } from "../components/Cards.js";

    export let textDirection: "ltr" | "rtl" = "ltr";
    export let themeHandler: ThemeHandler;
</script>

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
            {textDirection}
            textAlignment={card.textAlignment}
        ></Card>
    {/each}
</div>
