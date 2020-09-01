<script lang="ts">
  import { onMount } from "svelte";

  function getAreasFromString(areas) {
    const strippedWhitespace =
      // Replace all single quotes with whitespaces ..
      areas
        .split("'")
        .join(" ")
        // .. then replaces all double whitespaces with single whitespaces
        .split("  ")
        .join(" ");

    const items = {};

    // De-duplicate all area names
    strippedWhitespace
      .split(" ")
      .filter((o) => o.trim() !== "")
      .forEach((o) => (items[o] = true));

    // Return them as array
    return Object.keys(items);
  }

  let deviceClass = "mobile";

  onMount(() => {
    if (window.innerWidth <= 600) deviceClass = "mobile";
    else if (window.innerWidth <= 1024) deviceClass = "tablet";
    else deviceClass = "desktop";
  });

  function isAreaAvailable(parentLayout, childArea) {
    console.log("isAreaAvailable(parentLayout, childArea)", parentLayout, childArea);
    const availableAreas = getAreasFromString(parentLayout.areas);
    const found = availableAreas.find((o) => o === childArea);
    return !!found;
  }

  export let composition:Component;
  let componentDefintion:ComponentDefinition;


  export let library;

  let cssClass = null;

  $: {
    componentDefintion = composition[deviceClass];
    if (!componentDefintion) {
      componentDefintion = composition["mobile"];
    }

    if (componentDefintion.layout) {
      const layout = library.getLayoutByName(componentDefintion.layout);
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

{#if componentDefintion && (!componentDefintion.children || componentDefintion.children.length === 0)}
  <!-- This branch handles leaf-components -->
  <section
    style="grid-area: {componentDefintion.area}; display: grid; grid-template-columns:
    'minmax(1fr)'; grid-template-rows: 'minmax(1fr)'; overflow: hidden;">
    {#if componentDefintion.cssClasses}
      <div class={componentDefintion.cssClasses}>
        <svelte:component
          this={library.getComponentByName(componentDefintion.component)}
          data={componentDefintion.data} />
      </div>
    {:else}
      <svelte:component
              this={library.getComponentByName(componentDefintion.component)}
              data={componentDefintion.data} />
    {/if}
  </section>
{:else if componentDefintion}
  <!-- This branch handles container-components -->
  <section
    class="compositor"
    style="grid-area: {componentDefintion.area}; --areas: {library.getLayoutByName(componentDefintion.layout).areas};
    --columns: {library.getLayoutByName(componentDefintion.layout).columns}; --rows: {library.getLayoutByName(componentDefintion.layout).rows};
    ">
    {#each componentDefintion.children as child}
      {#if !child[deviceClass]}
        <!-- WHEN THE DEVICE CLASS DOESN'T EXIST ON THE CHILD, CHOOSE "mobile" -->
        {#if isAreaAvailable(library.getLayoutByName(componentDefintion.layout), child["mobile"].area)}
          <svelte:self {library} composition={child} />
        {:else}
        <!-- When a child has no 'area' to go to (it's area is not defined in the parent's layout),
          we simply shoot it to the moon.. -->
          <div style="position:absolute; left:-2000em; top:-2000em; visibility: hidden">
            <svelte:self {library} composition={child} />
          </div>
        {/if}
      {:else}
        {#if isAreaAvailable(library.getLayoutByName(componentDefintion.layout), child[deviceClass].area)}
          <svelte:self {library} composition={child} />
        {:else}
          <!-- When a child has no 'area' to go to (it's area is not defined in the parent's layout),
          we simply shoot it to the moon.. -->
          <div
            style="position:absolute; left:-2000em; top:-2000em; visibility:
            hidden">
            <svelte:self {library} composition={child} />
          </div>
        {/if}
      {/if}
    {/each}
  </section>
{/if}
