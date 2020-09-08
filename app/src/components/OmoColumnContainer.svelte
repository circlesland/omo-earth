<script lang="ts">
  import OmoCardProduct from "./OmoCardProduct.svelte";
  import { products } from "../stores/products";
  import { watchResize } from "svelte-watch-resize";
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

  let childComponents = [];

  $: {
    if (component) {
      componentDefinition = library.runtime.findComponentDefinition(component);
      id = component.id;
    }
  }

  let parentDimensions = {
    width: 0,
    height: 0
  }

  let viewContainer;


  function onResize(node) {
    if (!node || !node.parentElement)
      return;

    parentDimensions = {
      width: node.parentElement.offsetWidth,
      height: node.parentElement.offsetHeight
    }
  }
</script>

<div class="overflow-y-scroll p-12 bg-gray-200">
<section bind:this={viewContainer}
         use:watchResize={onResize}
         class:grid-cols-2="{parentDimensions.width < 600}"
         class:grid-cols-3="{parentDimensions.width > 600}"
         class="grid gap-10">
  {#each componentDefinition.children as childComponent}
    <svelte:component
            this={library.getComponentByName(childComponent.component)}
            {library}
            {component}
            data={childComponent.data} />
  {/each}
</section>
</div>