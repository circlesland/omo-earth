<script>
  import OmoCardProduct from "./OmoCardProduct.svelte";
  import {products} from "../stores/products";
</script>

<div class="overflow-y-scroll">

  <section
    class="grid gap-10 mx-auto px-4 py-4 md:p-16 lg:py-20 lg:px-32 grid-cols-1
    md:grid-cols-2 lg:grid-cols-3">
    {#each $products as data, i (data.id)}
      <OmoCardProduct {data} />
    {/each}
  </section>

</div>
