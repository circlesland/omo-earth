<script lang="ts">
  import OmoLogin from "./OmoLogin.svelte";

  export let data = {
    title: "omo earth",
    image: "https://source.unsplash.com/random",
    link: "/",
  };

  let id;

  // The "composition" contains the display document.
  export let component: Component;

  export let library;

  // A Component (see "composition") can contain multiple display documents. One for each DeviceClass.
  // This variable holds the current ComponentDefinition that was chosen by the Compositor.
  let componentDefinition: ComponentDefinition | undefined;

  let childComponents = [];

  $: {
    if (component) {
      componentDefinition = library.runtime.findComponentDefinition(component);
      id = component.id;
    }
  }
</script>

<div
  class="bg-cover bg-center object-fill"
  style="background-image: url({data.image})">
  <div class="h-full flex flex-col justify-center">
    {#if componentDefinition.children}
      {#each componentDefinition.children as childComponent}
        <svelte:component
          this={library.getComponentByName(childComponent.component)}
          {library}
          {component}
          data={childComponent.data} />
      {/each}
    {/if}
  </div>
</div>
