<script>
  import OmoCardProduct from "./OmoCardProduct.svelte";

  const products = [
    {
      id: "product1234",
      name: "product title",
      price: "50 ø",
      description: "product description",
      city: "Munich",
      group: "OrgaName",
      image: "https://source.unsplash.com/featured/?product",
    },
  ];
</script>

<div class="overflow-y-scroll">

  <section
    class="grid gap-10 mx-auto px-4 py-4 md:p-16 lg:py-20 lg:px-32 grid-cols-1
    md:grid-cols-2 lg:grid-cols-3">
    {#each products as data, i (data.id)}
      <OmoCardProduct {data} />
    {/each}
  </section>

</div>
