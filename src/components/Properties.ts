export let componentProperties = [
    {
        property_name: "displayField",
        type: "string",
        description:
            "When providing an object array displayField will be used to determine which field in the object will be displayed in the suggestions list",
        default_value: "Empty string",
    },
    {
        property_name: "highlightCharacters",
        type: '"matched", or "unmatched"',
        description:
            "Will highlight the matching/non matching characters based on the input",
        default_value: '"matched"',
    },
    {
        property_name: "item",
        type: "string[], or object[]",
        description: "The list of items to be used by the autocomplete",
        default_value: "Empty array",
    },
    {
        property_name: "noResultsMessage",
        type: "string",
        description:
            "The message to be displayed when no item matches the given input",
        default_value: '"No results found"',
    },
    {
        property_name: "setItemsOnFocus",
        type: "() => Promise<any[]>",
        description:
            "A lambda that allows for setting the item array when the autocomplete component is focused instead of when it is instantiated",
        default_value: "Returns an empty array",
    },
    {
        property_name: "sort",
        type: '"ascend", "descend", or ((a: any, b: any) => number)',
        description:
            "The sorting algorithm for the given items array, descend and ascend sorts only apply to a string array, for an objects array provide your own implementation",
        default_value: '"ascend"',
    },
    {
        property_name: "textAlignment",
        type: '"left", "center", or "right"',
        description:
            "Align the text of the suggestions in the suggestions list",
        default_value:
            'Based on textDirection, if it\'s set to "ltr" it will be "left" and vice versa',
    },
    {
        property_name: "textDirection",
        type: '"ltr", or "rtl"',
        description:
            "Use this property if you want to use the autocomplete in RTL mode",
        default_value: '"ltr"',
    },
    {
        property_name: "value",
        type: "string",
        description: "The currently selected value",
        default_value: "Empty string",
    },
];
