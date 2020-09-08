<script>
  import OmoCardProduct from "./OmoCardProduct.svelte";
  import { products } from "../stores/products";
</script>
{#each $products as data, i (data.id)}
  <OmoCardProduct {data} />
{/each}