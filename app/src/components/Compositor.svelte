<script lang="ts">
  import type { ComponentDefinition } from "../interfaces/component";
  import type { Component } from "../interfaces/component";
  import {DeviceClass} from "../interfaces/component";
  import {onDestroy, onMount} from "svelte";

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

  /**
   * Contains the svelte component instance.
   */
  let componentInstance;

  let deviceClass: DeviceClass = DeviceClass.mobile;

  onMount(() => {
    // Determine the DeviceClass
    if (window.innerWidth <= 600) deviceClass = DeviceClass.mobile;
    else if (window.innerWidth <= 1024) deviceClass = DeviceClass.tablet;
    else deviceClass = DeviceClass.desktop;

    // Register all component runtime instances
    if (composition && composition.id) {
      library.runtime.register(composition.id, componentInstance);
    }
  });

  onDestroy(() => {
    // Remove all component runtime instances
    if (composition && composition.id) {
      library.runtime.remove(composition.id);
    }
  });

  function isAreaAvailable(parentLayout, childArea) {
    const availableAreas = getAreasFromString(parentLayout.areas);
    const found = availableAreas.find((o) => o === childArea);
    return !!found;
  }

  let id;

  export let composition:Component;
  let componentDefinition:ComponentDefinition;

  export let library;

  let cssClass = null;

  $: {
    componentDefinition = composition[deviceClass];
    if (!componentDefinition) {
      componentDefinition = composition["mobile"];
    }

    if (componentDefinition.layout) {
      const layout = library.getLayoutByName(componentDefinition.layout);
      if (layout && layout.class) {
        cssClass = layout.class;
      }
    }

    // Remove the instance if the underlying view document changes its id

    if (composition) {
      if (id && id !== composition.id)
        library.runtime.remove(id);
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

{#if componentDefinition && (!componentDefinition.children || componentDefinition.children.length === 0)}
  <!-- This branch handles leaf-components -->
  <section
    style="grid-area: {componentDefinition.area}; display: grid; grid-template-columns:
    'minmax(1fr)'; grid-template-rows: 'minmax(1fr)'; overflow: hidden;">
    {#if componentDefinition.cssClasses}
      <div class={componentDefinition.cssClasses}>
        <svelte:component
          bind:this={componentInstance}
          this={library.getComponentByName(componentDefinition.component)}
          data={componentDefinition.data} />
      </div>
    {:else}
      <svelte:component
              bind:this={componentInstance}
              this={library.getComponentByName(componentDefinition.component)}
              data={componentDefinition.data} />
    {/if}
  </section>
{:else if componentDefinition}
  <!-- This branch handles container-components -->
  <section
    class="compositor"
    style="grid-area: {componentDefinition.area}; --areas: {library.getLayoutByName(componentDefinition.layout).areas};
    --columns: {library.getLayoutByName(componentDefinition.layout).columns}; --rows: {library.getLayoutByName(componentDefinition.layout).rows};
    ">
    {#each componentDefinition.children as child}
      {#if !child[deviceClass]}
        <!-- WHEN THE DEVICE CLASS DOESN'T EXIST ON THE CHILD, CHOOSE "mobile" -->
        {#if isAreaAvailable(library.getLayoutByName(componentDefinition.layout), child["mobile"].area)}
          <svelte:self
                  bind:this={componentInstance}
                  {library}
                  composition={child} />
        {:else}
        <!-- When a child has no 'area' to go to (it's area is not defined in the parent's layout),
          we simply shoot it to the moon.. -->
          <div style="position:absolute; left:-2000em; top:-2000em; visibility: hidden">
            <svelte:self
                    bind:this={componentInstance}
                    {library}
                    composition={child} />
          </div>
        {/if}
      {:else}
        {#if isAreaAvailable(library.getLayoutByName(componentDefinition.layout), child[deviceClass].area)}
          <svelte:self
                  bind:this={componentInstance}
                  {library}
                  composition={child} />
        {:else}
          <!-- When a child has no 'area' to go to (it's area is not defined in the parent's layout),
          we simply shoot it to the moon.. -->
          <div
            style="position:absolute; left:-2000em; top:-2000em; visibility:
            hidden">
            <svelte:self
                    bind:this={componentInstance}
                    {library}
                    composition={child} />
          </div>
        {/if}
      {/if}
    {/each}
  </section>
{/if}
