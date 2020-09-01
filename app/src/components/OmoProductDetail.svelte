<script>

  import { products } from "../stores/products";

  export let data = {};
  let productData = {};
  $: {
    productData = products.byId(data.id);
  }
</script>

{JSON.stringify(productData)}
