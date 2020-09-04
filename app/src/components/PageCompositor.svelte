<script lang="ts">
  import {Swiper, SwiperSlide} from 'svelte-swiper';
  import GridCompositor from "./GridCompositor.svelte";

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

  $: {
    if (component) {
      componentDefinition = library.runtime.findComponentDefinition(component);
      id = component.id;
    }
  }

</script>

<Swiper>
  {#each componentDefinition.children as child}
    {#if !library.runtime.findComponentDefinition(child).component}
      <SwiperSlide>
        <GridCompositor
                {library}
                component={child}
                data={library.runtime.findComponentDefinition(child).data} />
      </SwiperSlide>
    {:else}
      <SwiperSlide>
        <svelte:component
                this={library.getComponentByName(library.runtime.findComponentDefinition(child).component)}
                {library}
                component={child}
                data={library.runtime.findComponentDefinition(child).data} />
      </SwiperSlide>
    {/if}
  {/each}
</Swiper>