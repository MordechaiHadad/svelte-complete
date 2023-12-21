<script lang="ts">

    export let icon: string = "";
    export let callback;
    export let title: string;
    export let id: string = "";
    export let button: HTMLButtonElement | null = null;
</script>

<button
    bind:this={button}
    {id}
    class="ti {icon} p-1 content-center rounded-md w-fit h-fit border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-800 shadow-neutral-300 dark:shadow-neutral-700 hover:shadow-md transition-all duration-300 ease-in-out {$$props.class}"
    {title}
    on:click={callback}
></button>
