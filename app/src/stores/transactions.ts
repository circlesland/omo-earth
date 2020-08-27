import { writable } from 'svelte/store';

function createStore() {
  const data = [
    {
      id: "1",
      createdAt: "2020-01-01T23:23:23",
      subject: "Miete",
      from: {
        type: "users",
        id: "1"
      },
      to: {
        type: "users",
        id: "2"
      },
      amount: 600.5
    },
    {
      id: "2",
      createdAt: "2020-01-01T23:50:01",
      subject: "Zu viel bezahlt",
      from: {
        type: "users",
        id: "2"
      },
      to: {
        type: "users",
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