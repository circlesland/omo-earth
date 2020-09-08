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

  let headers = [];
  let footers = [];
  let items = [];

  $: {
    if (component) {
      componentDefinition = library.runtime.findComponentDefinition(component);
      id = component.id;
    }
    if (componentDefinition && componentDefinition.children) {
      const childComponentDefinitions = componentDefinition.children.map(component => {
        return {
          component,
          definition: library.runtime.findComponentDefinition(component)
        }
      });

      headers = childComponentDefinitions
              .filter(o => o.definition.area === "header")
              .map(o => o.component);
      footers = childComponentDefinitions
              .filter(o => o.definition.area === "footer")
              .map(o => o.component);
      items = childComponentDefinitions
              .filter(o => o.definition.area !== "header" && o.definition.area !== "footer")
              .map(o => o.component);
    }
  }
</script>

<style>
</style>

<section class="slotCompositor {componentDefinition.cssClasses}">
  <div class="flex flex-col h-full">
    <header>
      {#each headers as headerComponent}
        <slot name="header" headerComponent={headerComponent}/>
      {/each}
    </header>
    <main class="flex-1 overflow-y-auto">
      {#each items as itemComponent}
        <div>
          <slot name="body" itemComponent={itemComponent}>No data</slot>
        </div>
      {/each}
    </main>
    <footer>
      {#each footers as footerComponent}
        <slot name="footer" footerComponent={footerComponent}/>
      {/each}
    </footer>
  </div>
</section>