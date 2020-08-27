<script>
  import IconsFontAwesome from "../IconsFontAwesome.svelte";
  import { DummyTrigger } from "../../trigger/dummyTrigger";

  export let data;

  let items = [];

  $: {
    if (!data) {
      items = [
        {
          _type: "category",
          title: "No data",
        },
      ];
    } else {
      let menuItems = [];
      data.menu.categories.forEach((c) => {
        menuItems.push({
          _type: "category",
          title: c.title,
        });
        if (c.trigger && c.trigger.length > 0) {
          c.trigger.forEach((t) => {
            menuItems.push({
              _type: "item",
              _trigger: t,
              icon: t.icon,
              title: t.title,
              badge: t.badge,
            });
          });
        }
      });
      items = menuItems;
    }
  }
</script>

<IconsFontAwesome />
<div class="flex h-full w-full max-w-xs p-4 bg-primary">

  <ul class="flex flex-col w-full">
    {#each items as item}
      {#if item._type === 'category'}
        <li class="my-px">
          <span
            class="flex font-medium text-sm text-gray-400 px-4 my-4 uppercase">
            {item.title}
          </span>
        </li>
      {:else if item._type === 'item'}
        <li class="my-px">
          <a
            on:click={() => window.shellEvents.publish(item._trigger)}
            class="flex flex-row items-center h-12 px-4 rounded-lg text-gray-500
            hover:bg-gray-700">
            <span
              class="flex items-center justify-center text-lg text-gray-500">
              <svg
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
                class="h-6 w-6">
                <path
                  d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002
                  2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
            </span>
            <span class="ml-3">{item.title}</span>
          </a>
        </li>
      {/if}
    {/each}
  </ul>
</div>
