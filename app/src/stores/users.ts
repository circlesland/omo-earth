import {writable} from 'svelte/store';

function createStore()
{
  const data = [{
    loggedOn: true,
    id: "1",
    name: "Max Mustermann",
    email: "max@die-mustermanns.de",
    picture: "https://source.unsplash.com/random"
  },{
    loggedOn: true,
    id: "2",
    name: "Sabine Mustermann",
    email: "sabine@die-mustermanns.de",
    picture: "https://source.unsplash.com/random"
  },{
    loggedOn: true,
    id: "3",
    name: "Felix Mustermann",
    email: "felix@die-mustermanns.de",
    picture: "https://source.unsplash.com/random"
  },{
    loggedOn: false,
    id: "4",
    name: "Marta Mustermann",
    email: "marta@die-mustermanns.de",
    picture: "https://source.unsplash.com/random"
  }];
  const {subscribe, set, update} = writable(data);

  return {
    subscribe,
    byId: (id: string) => data.find(o => o.id === id),
    add: (user: any) => update(n => [...n, user]),
    reset: () => set([])
  };
}

export const users = createStore()