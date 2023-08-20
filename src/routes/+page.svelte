<script>
  import Autocomplete from "$lib/Autocomplete.svelte";
  let value = "";
</script>

<div dir="rtl">
  <Autocomplete
    items={["Apple", "Pineapple", "Homelander", "Brazza"]}
    bind:value
  />
</div>