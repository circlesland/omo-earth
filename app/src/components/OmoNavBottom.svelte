<script>
  import OmoModal from "./OmoModal.svelte";
  import IconsFontAwesome from "./IconsFontAwesome.svelte";

  export let data = { triggers: [] };

  let isOpen = false;
  let triggerRef;
</script>

<IconsFontAwesome />

<OmoModal {triggerRef} bind:isOpen>hello I am modal</OmoModal>

<ul
  class="border-t border-gray-300 flex justify-end bg-white text-gray-700 shadow
  h-full w-full">
  {#each data.triggers as trigger}
    <li
      on:click={() => window.shellEvents.publish(trigger)}
      class="hover:bg-gray-100 w-16 text-gray-600">
      <div class="h-16 w-16 px-6 flex justify-center items-center">
        <span class="pt-1 text-center items-center">
          <i class="text-lg fas {trigger.icon}" />
          <p class="text-xs lowercase">{trigger.title}</p>
        </span>
      </div>
    </li>
  {/each}
  <li class="mt-auto h-full flex items-center w-16">
    <button
      on:click={() => (isOpen = true)}
      class="h-16 w-10 mx-auto flex flex justify-center items-center w-full
      text-white hover:bg-secondary bg-action focus:outline-none">
      <i class="text-lg fas fa-plus" />
    </button>
  </li>
</ul>
