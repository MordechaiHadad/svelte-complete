interface cardTemplate {
  header: string;
  description: string;
  code: string;
  items: string[] | object[];
  displayField: string;
}

const basic = {
  header: "Basic Usage",
  description:
    "The basic way to use this library, simply pass an array of strings.",
  code: `<script>
  import Autocomplete from "svelte-complete";

  let items = ["apple", "banana", "orange"];
<\/script>

<Autocomplete {items} \/>
  `,
  items: ["apple", "banana", "orange"],
  displayField: "",
};

const objects = {
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

<Autocomplete {items} displayField="name" \/>
  `,
  items: [
		{ name: "Succes", id: 0},
		{ name: "Warning", id: 1},
		{ name: "Error", id: 2},
    { name: "Nice", id: 69 },
  ],
	displayField: "name"
};

export const cards: cardTemplate[] = [basic, objects];
