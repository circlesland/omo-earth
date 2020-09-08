<script>
  export let data = {};
</script>

<!-- 
<div class="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden my-4">
  <span
    class="font-title w-full text-center text-sm font-bold inline-block p-2
    uppercase text-white bg-secondary">
    {data.category}
  </span>
  <div class="relative">
    <div class="overflow-hidden h-3 text-xs flex bg-primary">
      <div
        style="width: 50%"
        class="shadow-none flex flex-col text-center whitespace-nowrap
        text-white justify-center bg-tertiary" />
    </div>
  </div>
  <img
    class="w-full h-56 object-cover object-center"
    src="https://source.unsplash.com/featured/?{data.city},city"
    alt={data.name} />
  <div class="w-full flex items-center px-6 py-3 bg-primary">
    <div
      class="w-full flex justify-between font-title text-white font-semibold
      text-lg">
      <span>Ø50 / week</span>
      <span class="text-red-500">
        -75%
        <span class="px-1 line-through">Ø12</span>
      </span>
    </div>
  </div>
  <div class="py-4 px-6">
    <h1 class="text-xl font-semibold text-primary">{data.name}</h1>
    <p class="py-2 text-gray-700 h-32">{data.description}</p>

    <div class="flex items-center mt-4 text-gray-700">
      <svg class="h-6 w-6 fill-current" viewBox="0 0 512 512">
        <path
          d="M256 32c-88.004 0-160 70.557-160 156.801C96 306.4 256 480 256
          480s160-173.6 160-291.199C416 102.557 344.004 32 256 32zm0
          212.801c-31.996 0-57.144-24.645-57.144-56 0-31.357 25.147-56
          57.144-56s57.144 24.643 57.144 56c0 31.355-25.148 56-57.144 56z" />
      </svg>
      {#each data.tags as tag}
        <p class="px-2 text-sm">{(allStores[tag.type].byId(tag.id)).name}</p>
      {/each}
    </div>
  </div>
  <div class="font-title flex justify-between w-full">
    <!-- svelte-ignore a11y-invalid-attribute -->
<!-- <a
      on:click={() => window.trigger(new NavigateTo('title', 'product/' + data.id))}
      href="#"
      class="w-full text-center text-white bg-secondary font-bold text-lg px-4
      py-2 uppercase hover:bg-tertiary">
      Buy Now
    </a>
  </div>
</div> -->

<div class="text-gray-700 w-full bg-white">
  <div class="h-full border-1 border-gray-200 overflow-hidden">
    <img
      class="lg:h-48 md:h-36 w-full object-cover object-center"
      src={data.image}
      alt="blog" />
    <div class="p-6">
      <h2
        class="tracking-widest text-xs title-font font-title uppercase
          text-gray-500 mb-1">
        {data.category}
      </h2>
      <h1 class="title-font font-title text-lg font-medium text-primary mb-3">
        {data.name}
      </h1>
      <p class="leading-relaxed mb-3">{data.description}</p>
      <span
        class="text-secondary uppercase font-title mr-3 inline-flex items-center
          leading-none text-2xl font-bold py-1">
        {data.price}
      </span>
    </div>
    <div
      class="py-3 font-bold text-white uppercase text-center bg-green-400
        hover:bg-green-300 cursor-pointer">
      Show Detail
    </div>
  </div>
</div>
