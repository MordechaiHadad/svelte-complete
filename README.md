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

### Component Properties

| **Property Name**       | Type                                                 | Description                                                                                                                                                  | Default Value            |
|-------------------------|------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------|
| **displayField**        | string                                               | When providing an object array `displayField` will be used to determine which field in the object will be displayed in the suggestions list                  | `Empty string`           |
| **highlightCharacters** | "matched", or "unmatched"                            | Will highlight the matching/non matching characters based on the input                                                                                       | `"matched"`              |
| **item**                | string[], or object[]                                | The list of items to be used by the autocomplete                                                                                                             | `Empty array`            |
| **noResultsMessage**    | string                                               | The message to be displayed when no item matches the given input                                                                                             | `"No results found"`     |
| **setItemsOnFocus**     | () => Promise<any[]>                                 | A lambda that allows for setting the item array when the autocomplete component is focused instead of when it is instantiated                                | `Returns an empty array` |
| **sort**                | "ascend", "descend", or ((a: any, b: any) => number) | The sorting algorithm for the given items array, descend and ascend sorts only apply to a string array, for an objects array provide your own implementation | `"ascend"`               |
| **textDirection**       | "auto", "ltr", or "rtl"                              | Use this property if you want to use the autocomplete in RTL mode, not required if parent's dir is set to "rtl"                                              | `"auto"`                 |
| **value**               | string                                               | The currently selected value                                                                                                                                 | `Empty string`           |



---

### Component CSS Variables

| CSS Variable Name                                 | Description                                                | Default Value                    |
|---------------------------------------------------|------------------------------------------------------------|----------------------------------|
| --autocomplete-active-suggestion-background-color | Sets background color for an active/hovered suggestion     | `rgb(115 115 115 / 0.2)`         |
| --autocomplete-container-height                   | Sets the height for the autocomplete component             | `fit-content`                    |
| --autocomplete-container-width                    | Sets the width for the autocomplete component              | `fit-content`                    |
| --autocomplete-input-background-color             | Sets the background color for the autocomplete input       | `rgb(250 250 250)`               |
| --autocomplete-input-border-color                 | Sets the border color for the autocomplete input           | `rgb(115 115 115)`               |
| --autocomplete-input-border-width                 | Sets the border width for the autocomplete input           | `1px`                            |
| --autocomplete-input-icon-color                   | Sets the color for the icon in the input box               | `var(--autocomplete-text-color)` |
| --autocomplete-input-width                        | Sets the width for the input box                           | `100%`                           |
| --autocomplete-input-x-padding                    | Sets the x axis padding for the input box                  | `0.5rem`                         |
| --autocomplete-input-y-padding                    | Sets the y axis padding for the input box                  | `0.5rem`                         |
| --autocomplete-no-results-text--color             | Sets the text color for the no results message             | `rgb(64 64 64)`                  |
| --autocomplete-suggestion-text-alignment          | Sets the text alignment for a suggestion                   | `"left"`                         |
| --autocomplete-suggestion-text-color              | Sets the text color for a suggestion                       | `var(--autocomplete-text-color)` |
| --autocomplete-suggestions-list-background-color  | Sets the background color for the suggestions list         | `rgb(250 250 250)`               |
| --autocomplete-suggestions-list-z-index           | Sets the z-index for the suggestions list                  | `10`                             |
| --autocomplete-text-color                         | Sets the general text color for the autocomplete container | `rgb(23 23 23)`                  |
