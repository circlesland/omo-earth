<script lang="ts">
  /*import { Component } from "../interfaces/component";
  import { Library } from "../interfaces/library";
*/
  export let composition;
  export let library;
</script>

<style>
  .compositor {
    height: 100%;
    display: grid;
    grid-template-areas: var(--areas);
    grid-template-columns: var(--columns);
    grid-template-rows: var(--rows);
    overflow: hidden;
  }
</style>

{#if composition && (!composition.children || composition.children.length === 0)}
  <section
          style="grid-area: {composition.area}; display: grid; grid-template-columns: 'minmax(1fr)'; grid-template-rows: 'minmax(1fr)'; overflow: hidden;">
    <svelte:component
            this={library.getComponentByName(composition.component)}
            data={composition.data} />
  </section>
{:else if composition}

  <section
          class="compositor"
          style="grid-area: '{composition.area}'; --areas: {composition.layout.areas}; --columns: {composition.layout.columns}; --rows: {composition.layout.rows}; ">
    {#each composition.children as child}
      <svelte:self library={library} composition={child} />
    {/each}
  </section>
{/if}