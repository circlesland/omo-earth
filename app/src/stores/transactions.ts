import { writable } from 'svelte/store';

function createStore() {
  const data = [
    {
      id: "1",
      createdAt: "2020-01-01T23:23:23",
      from: {
        type: "user",
        id: "1"
      },
      to: {
        type: "user",
        id: "2"
      },
      amount: 16.5
    },
    {
      id: "2",
      createdAt: "2020-01-01T23:50:01",
      from: {
        type: "user",
        id: "2"
      },
      to: {
        type: "user",
        id: "1"
      },
      amount: 0.5
    }
  ];
  const { subscribe, set, update } = writable(data);

  return {
    subscribe,
    byId: (id:string) => data.find(o => o.id === id),
    reset: () => set([])
  };
}

export const transactions = createStore()