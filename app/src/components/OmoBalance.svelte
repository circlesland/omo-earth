<script lang="ts">
  import {onMount} from "svelte";

  export let library;

  let dimensions = {
    w:0,
    h:0
  }

  onMount(() => {
    dimensions = library.runtime.getInstanceDimensions("content");
  });
</script>
<section class="overflow-x-hidden">
  <div class="p-6 flex justify-center flex-col text-center bg-white">
    <div class="">
      <h1>{JSON.stringify(dimensions)}</h1>
      <h1 class="text-secondary text-6xl font-bold">Φ1.582</h1>
      <span class="text-center text-xs md:text-base text-gray-500">
        0x1982731239129asdf8gouailsdbfka568sfzgouOASASDiu
      </span>
    </div>
  </div>
</section>
