<svelte:options accessors/>
<script lang="ts">
  import type {ComponentDefinition} from "../interfaces/component";
  import type {Component} from "../interfaces/component";
  import {DeviceClass} from "../interfaces/component";

  // If the compositor or the contained display component (leaf) should be able to receive events,
  // they need to have a id.
  // The id is specified in the "Component" and must be unique.
  let id;

  // The "composition" contains the display document.
  export let component: Component;

  export let library;

  // A Component (see "composition") can contain multiple display documents. One for each DeviceClass.
  // This variable holds the current ComponentDefinition that was chosen by the Compositor.
  let componentDefinition: ComponentDefinition|undefined;

  function clone(obj) {
    const json = JSON.stringify(obj);
    const clone = JSON.parse(json);
    return clone;
  }

  $: {
    if (component) {
      const deviceClass = library.runtime.getDeviceClass();
      let def = component[deviceClass];

      if (!def) {
        def = component[DeviceClass.mobile];
      }
      if (def) {
        def = clone(def);
      }

      componentDefinition = def;
      id = component.id;

      console.log(componentDefinition);
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

  .swipe-holder {
    height: 30vh;
    width: 100%;
  }

  img {
    max-width: 100%;
    height: auto;
  }
</style>
