<script>
  import IconsFontAwesome from "./IconsFontAwesome.svelte";

  const navitems = [
    {
      text: "Market",
      link: "marketplace",
      icon: "fa-shopping-cart",
    },
    {
      text: "Safe",
      link: "safe",
      icon: "fa-user-shield",
    },
    {
      text: "Dapps",
      link: "dapps",
      icon: "fa-th",
    },
  ];
</script>

<IconsFontAwesome />

<ul class="flex justify-end bg-white text-gray-700 shadow h-full w-full">

  {#each navitems as item}
    <li class="hover:bg-gray-100 w-16 text-gray-600">
      <div class="h-16 w-16 px-6 flex justify-center items-center">
        <span class="pt-1 text-center items-center">
          <i class="text-lg fas {item.icon}" />
          <p class="text-xs lowercase">{item.text}</p>
        </span>
      </div>
    </li>
  {/each}
  <li class="mt-auto h-full flex items-center w-16">
    <button
      class="h-16 w-10 mx-auto flex flex justify-center items-center w-full
      text-white hover:bg-secondary bg-action focus:outline-none">
      <i class="text-lg fas fa-plus" />
    </button>
  </li>

</ul>
