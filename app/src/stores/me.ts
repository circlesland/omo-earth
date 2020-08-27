import { writable } from 'svelte/store';

function createStore() {
  const { subscribe, set, update } = writable({
    loggedOn: true,
    id: 1,
    name: "Max Mustermann",
    email: "max@die-mustermanns.de",
    picture: "https://source.unsplash.com/random",
    trustedPersons: [{
      id: 2
    },{
      id: 3
    },{
      id: 4
    }],
    trustingPersons: [{
      id: 2
    },{
      id: 3
    },{
      id: 4
    }]
  });

  return {
    subscribe
  };
}

export const me = createStore()