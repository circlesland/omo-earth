<script>
  import IconsFontAwesome from "./IconsFontAwesome.svelte";
  import { ToggleSideNav } from "../trigger/shell/toggleSideNav";

  export let data = {};
</script>

<IconsFontAwesome />

<nav class="flex w-full justify-center bg-light text-primary">
  <div class="px-4 py-2 uppercase text-xl font-title font-bold">
    {#if data && data.title}{data.title}{:else}Omo Earth{/if}
  </div>
</nav>
