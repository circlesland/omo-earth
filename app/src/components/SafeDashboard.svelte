<script lang="ts">
  import SlotCompositor from "./SlotCompositor.svelte";
  import {library} from "../library";

  export let component;
</script>
<SlotCompositor library={library} component={component} let:childComponent={childComponent}>
  <svelte:component
          this={library.getComponentByName(library.runtime.findComponentDefinition(childComponent).component)}
          {library}
          component={component}
          data={library.runtime.findComponentDefinition(childComponent).data} />
</SlotCompositor>