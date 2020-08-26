<script lang="ts">

  function getAreasFromString(areas) {
    const withoutQuotes = areas.split("'").join(" ");
    const strippedWhitespace = withoutQuotes.split("  ").join(" ");
    const items = {};
    strippedWhitespace.split(" ").forEach(o => {
      if (o.trim() === "")
        return;
      items[o] = true;
    });
    const distinctAreas = Object.keys(items);
    console.log("getAreasFromString(areas: " + areas + ") : " + JSON.stringify(distinctAreas))
    return distinctAreas;
  }

  function isAreaAvailable(parentLayout, childArea)
  {
    const availableAreas = getAreasFromString(parentLayout.areas);
    const found = availableAreas.find(o => o === childArea);
    return !!found;
  }

  export let composition;
  export let library;
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

{#if composition && (!composition.children || composition.children.length === 0)}
  <section
    style="grid-area: {composition.area}; display: grid; grid-template-columns:
    'minmax(1fr)'; grid-template-rows: 'minmax(1fr)'; overflow: hidden;">
    <svelte:component
      this={library.getComponentByName(composition.component)}
      data={composition.data} />
  </section>
{:else if composition}

  <section
    class="compositor"
    style="grid-area: {composition.area}; --areas: {composition.layout.areas};
    --columns: {composition.layout.columns}; --rows: {composition.layout.rows}; ">
    {#each composition.children as child}
      {#if isAreaAvailable(composition.layout, child.area)}
        <svelte:self {library} composition={child} />
      {:else}
        <div style="position:absolute; left:-2000em; top:-2000em; visibility: hidden">
          <svelte:self {library} composition={child} />
        </div>
      {/if}
    {/each}
  </section>
{/if}
