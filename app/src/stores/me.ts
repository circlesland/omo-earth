import { writable } from 'svelte/store';

function createStore() {
  const { subscribe, set, update } = writable({
    loggedOn: true,
    id: 1,
    name: "Max Mustermann",
    email: "max@die-mustermanns.de",
    picture: "https://source.unsplash.com/random",
    trustedPersons: [{
      type: "users",
      id: "2"
    },{
      type: "users",
      id: "3"
    },{
      type: "users",
      id: "4"
    }],
    trustingPersons: [{
      type: "users",
      id: "2"
    },{
      type: "users",
      id: "3"
    },{
      type: "users",
      id: "4"
    }]
  });

  return {
    subscribe
  };
}

export const me = createStore()