<script>
  import IconsFontAwesome from "./IconsFontAwesome.svelte";
  import {SetLayout} from "../trigger/compositor/setLayout";
  import {ResetLayout} from "../trigger/compositor/resetLayout";

  export let data = {};

  let navState = true;
  function toggleNav() {
    if (navState){
      window.trigger(new SetLayout("content", "LayoutMain"));
    } else {
      window.trigger(new ResetLayout("content"));
    }
    navState = !navState;
  }
</script>

<IconsFontAwesome/>

<header>
  <nav class="flex justify-between w-full bg-primary text-white">
    <i class="fas fa-arrow-left p-2 hover:bg-secondary"
       on:click={() => toggleNav()}>&nbsp;</i>
    <nav class="flex justify-center w-full bg-white text-secondary">
      <!-- <i
        class="fas fa-bars p-2 hover:bg-white hover:text-secondary"
        on:click={() => window.trigger('left')} /> -->
      <div class="py-2 uppercase text-xs font-bold justify-center">
        {#if data && data.title}{data.title}{:else}Omo Earth{/if}

              <!-- <a href="/">
        <img alt="" class="h-6" src="/logos/omo.svg" alt="logo" />
      </a> 
      <a href="/">home</a>
      <a href="/blog">blog</a>
      <a href="/safe">safe</a>
      <a href="/market">market</a> -->
      </div>
      <!-- <i
        class="fas fa-arrow-right p-2 hover:bg-secondary"
        on:click={() => window.trigger('right')} /> -->
    </nav>
</header>
