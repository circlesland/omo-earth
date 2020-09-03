<svelte:options accessors/>
<script lang="ts">
  import type {ComponentDefinition} from "../interfaces/component";
  import type {Component} from "../interfaces/component";
  import type {Trigger} from "../trigger/trigger";
  import {DeviceClass} from "../interfaces/component";
  import {onDestroy, onMount} from "svelte";
  import {Actions} from "../actions/actions";
  import {DummyTrigger} from "../trigger/dummyTrigger";
  import GridCompositor from "./GridCompositor.svelte";
  import {library} from "../library";

  const swipeConfig = {
    autoplay: true,
    delay: 2000,
    showIndicators: true,
    transitionDuration: 1000,
    defaultIndex: 0,
  };

  // If the compositor or the contained display component (leaf) should be able to receive events,
  // they need to have a id.
  // The id is specified in the "Component" and must be unique.
  let id;

  // The "composition" contains the display document.
  export let component: Component;

  // A Component (see "composition") can contain multiple display documents. One for each DeviceClass.
  // This variable holds the current ComponentDefinition that was chosen by the Compositor.
  let componentDefinition: ComponentDefinition|undefined;
  let deviceClass: DeviceClass = DeviceClass.mobile;

  // When the "Component" has a "id" assigned, this variable will contain the corresponding event stream.
  let eventStream;
  let eventSubscription;

  let overrideLayout;

  onMount(() => {
    // Determine the DeviceClass
    deviceClass = library.runtime.getDeviceClass();

    // Register all component runtime instances
    if (component && component.id) {
      eventStream = library.runtime.register(component.id, this);
      id = component.id;
    }
  });

  onDestroy(() => {
    // Remove all component runtime instances
    if (component && component.id) {
      library.runtime.remove(component.id);
      eventStream = null;
      if (eventSubscription) {
        eventSubscription.unsubscribe();
      }
    }
  });

  let actions = {
    [Actions.dummyAction]: (trigger: DummyTrigger) => {
      console.log(id + " received DummyTrigger:", trigger);
    }
  };

  /**
   * Handles incoming events and calls the corresponding actions.
   */
  function eventHandler(trigger: Trigger|undefined) {
    // TODO: This is the same code as in App.svelte
    if (trigger.triggers) {
      // This event should trigger some action. Find it in the action repo and execute it.
      const foundAction = actions[trigger.triggers];
      if (foundAction) {
        foundAction(trigger);
      }
    }
  }

  function clone(obj) {
    const json = JSON.stringify(obj);
    const clone = JSON.parse(json);
    return clone;
  }

  $: {
    if (component) {
      let def = component[deviceClass];

      if (!def) {
        def = component[DeviceClass.mobile];
      }
      if (def) {
        def = clone(def);
      }
      if (def && overrideLayout) {
        def.layout = overrideLayout;
      }

      componentDefinition = def;

      console.log(componentDefinition);

      // Remove the instance if the underlying Component its id
      if (id && id !== component.id) {
        library.runtime.remove(id);
        eventStream = null;
        if (eventSubscription) {
          eventSubscription.unsubscribe();
        }
      }

      id = component.id;
      if (id && !library.runtime.find(id)) {
        eventStream = library.runtime.register(id, this);
      }
    }

    if (!eventSubscription && eventStream) {
      eventSubscription = eventStream.subscribe(eventHandler);
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
<!-- This branch handles leaf-components -->
{#if componentDefinition && componentDefinition.children && componentDefinition.children.length > 0}
  <section style="grid-area: {componentDefinition.area}; display: grid; grid-template-columns:
    'minmax(1fr)'; grid-template-rows: 'minmax(1fr)'; overflow: hidden;">
    {#if componentDefinition.cssClasses}
      <section class={componentDefinition.cssClasses}>
        {#each componentDefinition.children as child}
          <GridCompositor component={child}></GridCompositor>
        {/each}
      </section>
    {:else}
      <section>
        {#each componentDefinition.children as child}
          <GridCompositor component={child}></GridCompositor>
        {/each}
      </section>
    {/if}
  </section>
{/if}