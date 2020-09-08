import {derived, readable} from "svelte/store";
import {allStores} from "./allStores";


export const time = readable(new Date(), function start(set) {
  const interval = setInterval(() => {
    set(new Date());
  }, 1000);

  return function stop() {
    clearInterval(interval);
  };
});

export function createFilteredStore(baseType:string, tags:{type:string, id:string}[]) {
  const baseStore = allStores[baseType];
  if (!baseStore)
    throw new Error("Couldn't find a base store with the name '" + baseType + "'.");

  derived(baseStore, $baseStore =>
    {
      console.log($baseStore);
      const filtered = [];
      for (let item of $baseStore)
      {
        console.log(item);
      }
      return $baseStore;
    }
  );
}