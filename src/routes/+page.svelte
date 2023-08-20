<script>
  import Autocomplete from "$lib/Autocomplete.svelte";
  let value = "";
</script>

<Autocomplete
  items={["Apple", "Pineapple", "Homelander", "Brazza"]}
  bind:value
/>
