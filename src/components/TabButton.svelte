<script lang="ts">
    export let content: string;
    export let title: string;
    export let activeTabIndex = 0;
    export let tabIndex: number;
    let switchTab = (index: number) => {
        activeTabIndex = index;
    };
    let isActive = activeTabIndex === tabIndex ? true : false;

    $: isActive = activeTabIndex === tabIndex ? true : false;
</script>

<button
    class="md:text-lg font-semibold {isActive
        ? 'text-neutral-700 dark:text-neutral-300'
        : 'text-neutral-600 dark:text-neutral-400'} hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors duration-150 ease-in-out"
    {title}
    on:click={() => switchTab(tabIndex)}
>
    {content}
</button>
