<script>
  import OmoModal from "./OmoModal.svelte";
  import IconsFontAwesome from "./IconsFontAwesome.svelte";

  export let data = { triggers: [] };

  let isOpen = false;
  let triggerRef;
</script>

<IconsFontAwesome />

<OmoModal {triggerRef} bind:isOpen>hello I am modal</OmoModal>

<ul class="flex bg-primary text-white shadow h-full w-full">
  <li class="mt-auto h-full flex items-center w-16 border-r border-blue-900">
    <img src="/images/logo.svg" class="p-3" />
  </li>
  <li class="flex flex-1 justify-center md:justify-start">
    {#each data.triggers as trigger}
      <li
        on:click={() => window.trigger(trigger)}
        class="hover:bg-gray-100 hover:text-secondary w-16">
        <div class="h-16 w-16 px-6 flex justify-center items-center">
          <span class="pt-1 text-center items-center">
            <i class="text-lg fas {trigger.icon}" />
            <p class="text-xs">{trigger.title}</p>
          </span>
        </div>
      </li>
    {/each}
  </li>
  <li class="mt-auto h-full flex items-center w-16">
    <button
      on:click={() => (isOpen = true)}
      class="h-16 w-10 mx-auto flex flex justify-center items-center w-full
      text-white hover:bg-gray-100 hover:text-secondary bg-action
      focus:outline-none">
      <i class="text-lg fas fa-plus" />
    </button>
  </li>
</ul>
