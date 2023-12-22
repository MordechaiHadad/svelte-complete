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
		{ name: "Success", id: 0},
		{ name: "Warning", id: 1},
		{ name: "Error", id: 2},
    	{ name: "Nice", id: 69 },
  ];
<\/script>

<Autocomplete {items} displayField="name" \/>`,
    items: [
        { name: "Success", id: 0 },
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
        "Svelte-complete provides three different ways to sort your autocomplete items: ascend, descend, and a custom sorting function. Keep in mind that ascend and descend sorts only work for string arrays. For this example, we will implement the descend sort.",
    code: `<script>
  import Autocomplete from "svelte-complete";

	const items = [
		{ name: "Success", id: 0},
		{ name: "Warning", id: 1},
		{ name: "Error", id: 2},
    	{ name: "Nice", id: 69 },
  ];

  const sort = (a: {id: number, name: string}, b: {id: number, name: string}) => b.name.localeCompare(a.name);
<\/script>

<Autocomplete {items} {sort} displayField="name" \/>`,
    items: [
        { name: "Success", id: 0 },
        { name: "Warning", id: 1 },
        { name: "Error", id: 2 },
        { name: "Nice", id: 69 },
    ],
    displayField: "name",
    sort: (a: { id: number; name: string }, b: { id: number; name: string }) =>
        b.name.localeCompare(a.name),
    textAlignment: "left",
};

export const cards: cardTemplate[] = [basic, objects, sorts];
