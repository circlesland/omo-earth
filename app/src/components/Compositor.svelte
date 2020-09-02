<svelte:options accessors />
<script lang="ts">
  import type { ComponentDefinition } from "../interfaces/component";
  import type { Component } from "../interfaces/component";
  import type {Trigger} from "../trigger/trigger";
  import {DeviceClass} from "../interfaces/component";
  import {onDestroy, onMount} from "svelte";
  import {Actions} from "../actions/actions";
  import {SetLayout} from "../trigger/compositor/setLayout";
  import {ResetLayout} from "../trigger/compositor/resetLayout";

   // If the compositor or the contained display component (leaf) should be able to receive events,
   // they need to have a id.
   // The id is specified in the "Component" and must be unique.
  let id;

   // The library from which the Compositor looks up component classes by name
   // and where it registers runtime instances of the created components.
  export let library;

  // The "composition" contains the display document.
  export let component:Component;

  // A Component (see "composition") can contain multiple display documents. One for each DeviceClass.
  // This variable holds the current ComponentDefinition that was chosen by the Compositor.
  let componentDefinition:ComponentDefinition|undefined;
  let deviceClass: DeviceClass = DeviceClass.mobile;

  // Contains the svelte component instance.
  let componentInstance;

  // When the "Component" has a "id" assigned, this variable will contain the corresponding event stream.
  let eventStream;
  let eventSubscription;

  let overrideLayout;

  onMount(() => {
    // Determine the DeviceClass
    if (window.innerWidth <= 600) deviceClass = DeviceClass.mobile;
    else if (window.innerWidth <= 1024) deviceClass = DeviceClass.tablet;
    else deviceClass = DeviceClass.desktop;

    // Register all component runtime instances
    if (component && component.id) {
      eventStream = library.runtime.register(component.id, componentInstance);
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
    [Actions.resetLayout]: (trigger: ResetLayout) => {
      console.log(trigger);
      overrideLayout = undefined;
    },
    [Actions.setLayout]: (trigger: SetLayout) => {
      console.log(trigger);
      overrideLayout = trigger.layoutName;
    }
  };

  function getAreas(componentDefinition) {
    return library.getLayoutByName(componentDefinition.layout).areas;
  }
  function getRows(componentDefinition) {
    return library.getLayoutByName(componentDefinition.layout).rows;
  }
  function getColumns(componentDefinition) {
    return library.getLayoutByName(componentDefinition.layout).columns;
  }

  /**
   * Handles incoming events.
   */
  function eventHandler(trigger:Trigger|undefined) {
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
        componentDefinition = component[deviceClass];
      if (!componentDefinition) {
        componentDefinition = component[DeviceClass.mobile];
      }
      if (componentDefinition) {
        componentDefinition = clone(componentDefinition);
      }
      if (componentDefinition && overrideLayout) {
        componentDefinition.layout = overrideLayout;
      }

      // Remove the instance if the underlying Component its id
      if (id && id !== component.id) {
        library.runtime.remove(id);
        eventStream = null;
        if (eventSubscription) {
          eventSubscription.unsubscribe();
        }
      }

      id = component.id;
      if (id && componentInstance && !library.runtime.find(id)) {
        eventStream = library.runtime.register(id, componentInstance);
      }
    }

    if (!eventSubscription && eventStream) {
      eventSubscription = eventStream.subscribe(eventHandler);
    }
  }

  function isAreaAvailable(parentLayout, childArea) {
    const availableAreas = getAreasFromString(parentLayout.areas);
    return availableAreas.find((o) => o === childArea);
  }

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
    style="grid-area: {componentDefinition.area}; --areas: {getAreas(componentDefinition)};
    --columns: {getColumns(componentDefinition)}; --rows: {getRows(componentDefinition)};
    ">
    {#each componentDefinition.children as child}
      {#if !child[deviceClass]}
        <!-- WHEN THE DEVICE CLASS DOESN'T EXIST ON THE CHILD, CHOOSE "mobile" -->
        {#if isAreaAvailable(library.getLayoutByName(componentDefinition.layout), child["mobile"].area)}
          <svelte:self
                  bind:this={componentInstance}
                  {library}
                  component={child} />
        {:else}
        <!-- When a child has no 'area' to go to (it's area is not defined in the parent's layout),
          we simply shoot it to the moon.. -->
          <div style="position:absolute; left:-2000em; top:-2000em; visibility: hidden">
            <svelte:self
                    bind:this={componentInstance}
                    {library}
                    component={child} />
          </div>
        {/if}
      {:else}
        {#if isAreaAvailable(library.getLayoutByName(componentDefinition.layout), child[deviceClass].area)}
          <svelte:self
                  bind:this={componentInstance}
                  {library}
                  component={child} />
        {:else}
          <!-- When a child has no 'area' to go to (it's area is not defined in the parent's layout),
          we simply shoot it to the moon.. -->
          <div
            style="position:absolute; left:-2000em; top:-2000em; visibility:
            hidden">
            <svelte:self
                    bind:this={componentInstance}
                    {library}
                    component={child} />
          </div>
        {/if}
      {/if}
    {/each}
  </section>
{/if}
