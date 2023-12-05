# Svelte Complete

A simple autocomplete component for Svelte that fully supports RTL.

## 🔧 Installation

Work in progress.

## ❓ Usage

### Minimalist Example

```html
<script>
    import Autocomplete from "svelte-complete";

    let items = ["apple", "banana", "orange"];
    let value;
</script>

<Autocomplete {items} bind:value="{value}" />
```

### ⚙ Configuration

| **Property Name**       | Type                                                  | Description                                                                                                                                                  | Default Value                                                                       |
|-------------------------|-------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------|
| **item**                | string[] OR object[]                                  | The list of items to be used by the autocomplete                                                                                                             | `Empty array`                                                                       |
| **noResultsMessage**    | string                                                | The message to be displayed when no item matches the given input                                                                                             | `"No results found"`                                                                |
| **value**               | string                                                | The currently selected value                                                                                                                                 | `Empty string`                                                                      |
| **sort**                | "ascend" OR "descend" OR ((a: any, b: any) => number) | The sorting algorithm for the given items array, descend and ascend sorts only apply to a string array, for an objects array provide your own implementation | `"ascend"`                                                                          |
| **highlightCharacters** | "matched" OR "unmatched"                              | Will highlight the matching/non matching characters based on the input                                                                                       | `"matched"`                                                                         |
| **displayField**        | string                                                | When providing an object array `displayField` will be used to determine which field in the object will be displayed in the suggestions list                  | `Empty string`                                                                      |
| **textDirection**       | "ltr" OR "rtl"                                        | Use this property if you want to use the autocomplete in RTL mode                                                                                            | `"ltr"`                                                                             |
| **textAlignment**       | "left" OR "center" OR "right"                         | Align the text of the suggestions in the suggestions list                                                                                                    | Based on `textDirection`, if it's set to `"ltr"` it will be `"left"` and vice versa |
