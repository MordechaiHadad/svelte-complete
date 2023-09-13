<script lang="ts">
  import Autocomplete from "$lib/Autocomplete.svelte";
  let value = "";

  const items = [
    { name: "hello", id: 69 },
    { name: "bye", id: 10 },
    { name: "bbruh", id: 0 },
  ];

  function test2(a: any, b: any): number {
    return b["id"] - a["id"];
  }
</script>

<Autocomplete {items} displayField={"name"} sort={"ascend"} />