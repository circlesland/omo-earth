<script lang="ts">
  import SlotCompositor from "./SlotCompositor.svelte";
  import {library} from "../library";

  export let component;
</script>

<style>

</style>

<SlotCompositor library={library} component={component}>
  <div slot="header" let:headerComponent={headerComponent}>
    <svelte:component
            this={library.getComponentByName(library.runtime.findComponentDefinition(headerComponent).component)}
            {library}
            component={headerComponent}
            data={library.runtime.findComponentDefinition(headerComponent).data} />
  </div>
  <div slot="body" let:itemComponent={itemComponent}>
    <svelte:component
            this={library.getComponentByName(library.runtime.findComponentDefinition(itemComponent).component)}
            {library}
            component={itemComponent}
            data={library.runtime.findComponentDefinition(itemComponent).data} />
  </div>
  <div slot="footer" let:footerComponent={footerComponent}>
    <svelte:component
            this={library.getComponentByName(library.runtime.findComponentDefinition(footerComponent).component)}
            {library}
            component={footerComponent}
            data={library.runtime.findComponentDefinition(footerComponent).data} />
  </div>
</SlotCompositor>