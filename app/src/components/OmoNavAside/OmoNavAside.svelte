<script>
  import IconsFontAwesome from "../IconsFontAwesome.svelte";
  import { DeviceClass } from "../../interfaces/component";
  import { ToggleSideNav } from "../../trigger/shell/toggleSideNav";

  export let library;
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

  function onMenuItemClick(item, e) {
    e.preventDefault();
    const deviceClass = library.runtime.getDeviceClass();
    if (deviceClass === DeviceClass.mobile) {
      window.trigger(new ToggleSideNav());
    }
    window.trigger(item._trigger);
  }
</script>

<IconsFontAwesome />
<div class="flex h-full w-full p-4 bg-light">
  <ul class="flex flex-col w-full">
    {#each items as item}
      {#if item._type === 'category'}
        <li class="">
          <span
            class="flex font-sans font-bold text-sm text-secondary px-4 my-4">
            {item.title}
          </span>
        </li>
      {:else if item._type === 'item'}
        <li class="">
          <!-- svelte-ignore a11y-invalid-attribute -->
          <a
            href="#"
            on:click={(e) => onMenuItemClick(item, e)}
            class="flex flex-row font-title text-sm uppercase font-bold
              items-center h-10 px-4 text-gray-500 hover:bg-gray-200
              hover:text-secondary">
            {#if item.icon}
              <i class="text-sm fas {item.icon}" />
            {:else}<i class="text-sm fas fa-question" />{/if}
            <span class="ml-3">{item.title}</span>
          </a>
        </li>
      {/if}
    {/each}
  </ul>
</div>
