<script lang="ts">

  import {onMount} from "svelte";

  function getAreasFromString(areas) {
    const strippedWhitespace =
            // Replace all single quotes with whitespaces ..
            areas.split("'").join(" ")
                    // .. then replaces all double whitespaces with single whitespaces
                    .split("  ").join(" ");

    const items = {};

    // De-duplicate all area names
    strippedWhitespace.split(" ")
            .filter(o => o.trim() !== "")
            .forEach(o => items[o] = true);

    // Return them as array
    return Object.keys(items);
  }

  let deviceClass = "mobile";

  onMount(() => {
    if (window.innerWidth <= 600)
      deviceClass = "mobile";
    else if (window.innerWidth <= 1024)
      deviceClass = "tablet";
    else
      deviceClass = "desktop";
  });

  function isAreaAvailable(parentLayout, childArea) {
    const availableAreas = getAreasFromString(parentLayout.areas);
    const found = availableAreas.find(o => o === childArea);
    return !!found;
  }

  export let composition;
  export let library;

  let cssClass = null;

  let layoutName = "";

  $:{
    if (composition.layout) {
      if (typeof composition.layout === "string") {
        console.log(composition);
        layoutName = composition.layout;
      } else {
        console.log("composition.layout[deviceClass]", composition, deviceClass, composition.layout[deviceClass])
        layoutName = composition.layout[deviceClass];
      }
      const layout = library.getLayoutByName(layoutName);
      if (layout && layout.class) {
        cssClass = layout.class;
      }
    }
  }
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
  <!-- This branch handles leaf-components -->
  <section style="grid-area: {composition.area}; display: grid; grid-template-columns:
    'minmax(1fr)'; grid-template-rows: 'minmax(1fr)'; overflow: hidden;">
    {#if composition.cssClasses}
      <div class="{composition.cssClasses}">
        {#if typeof composition.component === "string"}
          <svelte:component
                  this={library.getComponentByName(composition.component)}
                  data={composition.data}/>
        {:else}
          <svelte:component
                  this={library.getComponentByName(composition.component[deviceClass])}
                  data={composition.data}/>
        {/if}
      </div>
    {:else}
      {#if typeof composition.component === "string"}
        <svelte:component
                this={library.getComponentByName(composition.component)}
                data={composition.data}/>
      {:else}
        <svelte:component
                this={library.getComponentByName(composition.component[deviceClass])}
                data={composition.data}/>
      {/if}
    {/if}
  </section>
{:else if composition}
  <!-- This branch handles container-components -->
  <section
          class="compositor"
          style="grid-area: {composition.area}; --areas: {library.getLayoutByName(layoutName).areas};
    --columns: {library.getLayoutByName(layoutName).columns}; --rows: {library.getLayoutByName(layoutName).rows}; ">
    {#if composition.cssClasses}

    <div class="{composition.cssClasses}">
      {#each composition.children as child}
        {#if isAreaAvailable(library.getLayoutByName(layoutName), child.area)}
          <svelte:self {library} composition={child}/>
        {:else}
        <!-- When a child has no 'area' to go to (it's area is not defined in the parent's layout),
        we simply shoot it to the moon.. -->
          <div style="position:absolute; left:-2000em; top:-2000em; visibility: hidden">
            <svelte:self {library} composition={child}/>
          </div>
        {/if}
      {/each}
    </div>

    {:else}

      {#each composition.children as child}
        {#if isAreaAvailable(library.getLayoutByName(layoutName), child.area)}
          <svelte:self {library} composition={child}/>
        {:else}
        <!-- When a child has no 'area' to go to (it's area is not defined in the parent's layout),
        we simply shoot it to the moon.. -->
          <div style="position:absolute; left:-2000em; top:-2000em; visibility: hidden">
            <svelte:self {library} composition={child}/>
          </div>
        {/if}
      {/each}

    {/if}
  </section>
{/if}
