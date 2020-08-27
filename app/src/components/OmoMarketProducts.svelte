<script>
  import OmoCardProduct from "./OmoCardProduct.svelte";

  const products = [
    {
      id: "1234",
      name: "Banana",
      category: "food",
      price: "20 ø",
      description: "product description",
      city: "Munich",
      group: "OrgaName",
      image: "https://source.unsplash.com/featured/?banana",
    },
    {
      id: "12345",
      name: "Shoe",
      category: "clothing",
      price: "50 ø",
      description: "product description",
      city: "Berlin",
      group: "OrgaName",
      image: "https://source.unsplash.com/featured/?shoe",
    },
    {
      id: "123456",
      name: "Appartment",
      category: "living",
      price: "100.000 ø",
      description: "product description",
      city: "Baku",
      group: "OrgaName",
      image: "https://source.unsplash.com/featured/?appartment",
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
