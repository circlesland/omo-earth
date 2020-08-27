<script>
  import IconsFontAwesome from "./IconsFontAwesome.svelte";
  export let data = {};
</script>

<IconsFontAwesome />

<header>
  <nav class="flex justify-between w-full bg-primary text-white">
    <i
      class="fas fa-arrow-left p-2 hover:bg-secondary"
      on:click={() => window.shellEvents.publish('left')} />
    <div class="py-2 uppercase text-xs font-bold justify-center">
      {#if data.title}{data.title}{:else}Omo Earth{/if} (Tablet)
      <!-- <a href="/">
        <img alt="" class="h-6" src="/logos/omo.svg" alt="logo" />
      </a> 
      <a href="/">home</a>
      <a href="/blog">blog</a>
      <a href="/safe">safe</a>
      <a href="/market">market</a> -->
    </div>
    <i
      class="fas fa-arrow-right p-2 hover:bg-secondary"
      on:click={() => window.shellEvents.publish('right')} />
  </nav>
</header>
