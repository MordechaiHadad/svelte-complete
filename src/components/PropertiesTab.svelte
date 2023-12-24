<script lang="ts">
    import {
        componentCSSVariables,
        componentProperties,
    } from "./Properties.js";
    import { Tables } from "@mordechaihadad/tables"
    import { onMount } from "svelte";

    let propertiesTables: Tables;
    let cssVariablesTables: Tables;
    const styling = {
        table: "bg-neutral-100 dark:bg-neutral-900 rounded-md text-neutral-900 dark:text-neutral-100".split(
            " "
        ),
        tableHeaders:
            "border-b text-sm md:text-base border-neutral-500 dark:border-neutral-500 bg-neutral-200 dark:bg-neutral-800 py-2 px-2 lg:px-4 text-start".split(
                " "
            ),
        tableData:
            "border-y border-neutral-500 text-sm md:text-base dark:border-neutral-500 px-2 lg:px-4 py-2 lg:pt-4 align-top".split(
                " "
            ),
    };

    onMount(() => {
        propertiesTables = new Tables(
            "props",
            {
                headers: [
                    "Property Name",
                    "Type",
                    "Description",
                    "Default Value",
                ],
                data: componentProperties,
            },
            styling
        );

        cssVariablesTables = new Tables(
            "vars",
            {
                headers: ["CSS Variable Name", "Description", "Default Value"],
                data: componentCSSVariables,
            },
            styling
        );
    });
</script>

<div class="flex flex-col gap-16">
    <div class="flex flex-col gap-6">
        <h1 class="text-xl md:text-2xl">Component Properties</h1>
        <div
            class="max-w-xs overflow-auto md:max-w-2xl lg:max-w-4xl rounded-md border border-neutral-500 dark:bg-neutral-500"
        >
            <table id="props"></table>
        </div>
    </div>
    <div class="flex flex-col gap-4">
        <h1 class="text-xl md:text-2xl">Component CSS Variables</h1>
        <div
            class="max-w-xs overflow-auto md:max-w-2xl lg:max-w-4xl rounded-md border border-neutral-500 dark:bg-neutral-500"
        >
            <table id="vars"></table>
        </div>
    </div>
</div>