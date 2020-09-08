<script>
  import OmoCardProduct from "./OmoCardProduct.svelte";
  import { products } from "../stores/products";
</script>

<section class="grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  {#each $products as data, i (data.id)}
    <OmoCardProduct {data} />
  {/each}
</section>
