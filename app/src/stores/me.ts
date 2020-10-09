import { writable } from 'svelte/store';
import type {Entry} from "../graphQL/identity/generated";

function createStore() {
  const existingIndexEntry = sessionStorage.getItem("me");

  const emptyEntry:Entry = {
    ownerFingerPrint: null,
    creatorFingerPrint: null,
    entryHash: null,
    content: {
      email: null
    },
  };

  const indexEntry = existingIndexEntry
    ? JSON.parse(existingIndexEntry)
    : emptyEntry;

  const { subscribe, set, update } = writable(indexEntry);

  return {
    subscribe,
    set,
    update
  };
}

export const me = createStore()

me.subscribe((s) => {
  sessionStorage.setItem("me", JSON.stringify(s));
});