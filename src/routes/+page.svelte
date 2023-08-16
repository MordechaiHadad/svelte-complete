<script>
  import Autocomplete from "$lib/Autocomplete.svelte";
  let value = "";
</script>

<div dir="rtl">
  <Autocomplete items={["Apple", "Pineapple", "Homelander"]} bind:value />

  <Autocomplete items={["Apple", "Pineapple", "Homelander"]} />
</div>
<div>
  <Autocomplete items={["Bro", "Wtf", "damn"]} />
</div>