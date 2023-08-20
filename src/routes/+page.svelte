<script lang="ts">
  import Autocomplete from "$lib/Autocomplete.svelte";
  let value = "";
</script>

<Autocomplete
  bind:value
  setItemsOnFocus={async () => {return ["hi", "bye"]}}
/>
