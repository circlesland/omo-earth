import { writable } from 'svelte/store';

function createStore() {
  const existingAgent = sessionStorage.getItem("me");

  const emptyAgent = {
    type: "",
    key: "",
    identityPublicKey: "",
    privateData: {},
    publicData: {}
  };

  const agent = existingAgent
    ? JSON.parse(existingAgent)
    : emptyAgent;

  const { subscribe, set, update } = writable(agent);

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