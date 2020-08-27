import {writable} from 'svelte/store';

function createStore()
{
  const data = [{
    loggedOn: true,
    id: "1",
    name: "Munich"
  },{
    loggedOn: true,
    id: "2",
    name: "Berlin"
  },{
    loggedOn: true,
    id: "3",
    name: "Sofia"
  },{
    loggedOn: true,
    id: "4",
    name: "San Francisco"
  }];
  const {subscribe, set, update} = writable(data);

  return {
    subscribe,
    byId: (id: string) => data.find(o => o.id === id),
    add: (city: any) => update(n => [...n, city]),
    reset: () => set([])
  };
}

export const cities = createStore()