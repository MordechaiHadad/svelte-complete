interface cardTemplate {
    header: string;
    description: string;
    code: string;
    items: string[] | object[];
    displayField: string;
    sort: "ascend" | "descend" | ((a: any, b: any) => number);
    textAlignment: "left" | "right" | "center";
}

const basic: cardTemplate = {
    header: "Basic Usage",
    description:
        "The basic way to use this library, simply pass an array of strings.",
    code: `<script>
  import Autocomplete from "svelte-complete";

  let items = ["apple", "banana", "orange"];
<\/script>

<Autocomplete {items} \/>`,
    items: ["apple", "banana", "orange"],
    displayField: "",
    sort: "ascend",
    textAlignment: "left",
};

const objects: cardTemplate = {
    header: "Using with Objects",
    description:
        "When using objects, you will have to pass the array of objects and also specify which field will be displayed with `displayField`.",
    code: `<script>
  import Autocomplete from "svelte-complete";

	const items = [
		{ name: "Succes", id: 0},
		{ name: "Warning", id: 1},
		{ name: "Error", id: 2},
    	{ name: "Nice", id: 69 },
  ];
<\/script>

<Autocomplete {items} displayField="name" \/>`,
    items: [
        { name: "Succes", id: 0 },
        { name: "Warning", id: 1 },
        { name: "Error", id: 2 },
        { name: "Nice", id: 69 },
    ],
    displayField: "name",
    sort: "ascend",
    textAlignment: "left",
};

const sorts: cardTemplate = {
    header: "Using different sorts",
    description:
        "svelte-complete provides three different ways to sort your autocomplete items: ascend, descend, and a custom sorting function. Keep in mind that ascend and descend sorts only work for string arrays. For this example, we will implement the descend sort.",
    code: `<script>
  import Autocomplete from "svelte-complete";

	const items = [
		{ name: "Succes", id: 0},
		{ name: "Warning", id: 1},
		{ name: "Error", id: 2},
    	{ name: "Nice", id: 69 },
  ];

  const sort = (a: {id: number, name: string}, b: {id: number, name: string}) => b.name.localeCompare(a.name);
<\/script>

<Autocomplete {items} {sort} displayField="name" \/>`,
    items: [
        { name: "Succes", id: 0 },
        { name: "Warning", id: 1 },
        { name: "Error", id: 2 },
        { name: "Nice", id: 69 },
    ],
    displayField: "name",
    sort: (a: { id: number; name: string }, b: { id: number; name: string }) =>
        b.name.localeCompare(a.name),
    textAlignment: "left",
};

const textAlignment: cardTemplate = {
    header: "Suggestions list text alignments",
    description:
        "Your suggestions list items can have three different alignments: left (default), right, and center. Keep in mind that when using left alignment and then enabling RTL, the alignment will become right, but if the specified text alignment is center, the text alignment change due to RTL won't go into effect.",
    code: `<script>
  import Autocomplete from "svelte-complete";

  let items = ["apple", "banana", "orange"];
<\/script>

<Autocomplete {items} textAlignment="center" \/>`,
    items: ["apple", "banana", "orange"],
    displayField: "",
    sort: "ascend",
    textAlignment: "center",
};

export const cards: cardTemplate[] = [basic, objects, sorts, textAlignment];
