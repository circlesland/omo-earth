import { writable } from "svelte/store";

function createStore() {
  const data = [
    {
      id: "1",
      createdAt: 1598941028,
      subject: "Rent",
      from: {
        type: "users",
        id: "1",
      },
      to: {
        type: "users",
        id: "2",
      },
      direction: "out",
      amount: 400,
      type: "rent",
    },
    {
      id: "2",
      createdAt: 1598953028,
      subject: "Universal Basic Income",
      from: {
        type: "users",
        id: "2",
      },
      to: {
        type: "users",
        id: "1",
      },
      direction: "in",
      amount: 24,
      type: "ubi",
    },
    {
      id: "3",
      createdAt: 1598933028,
      subject: "Coffee",
      from: {
        type: "users",
        id: "2",
      },
      to: {
        type: "users",
        id: "1",
      },
      direction: "out",
      amount: 4,
      type: "beverages",
    },
    {
      id: "4",
      createdAt: 1598253028,
      subject: "Omo Scooter",
      from: {
        type: "users",
        id: "2",
      },
      to: {
        type: "users",
        id: "1",
      },
      amount: 7.5,
      direction: "out",
      type: "mobility",
    },
    {
      id: "2",
      createdAt: 1598153028,
      subject: "Universal Basic Income",
      from: {
        type: "users",
        id: "2",
      },
      to: {
        type: "users",
        id: "1",
      },
      direction: "in",
      amount: 24,
      type: "ubi",
    },
    {
      id: "5",
      createdAt: 1598253028,
      subject: "Thank you for the beer",
      from: {
        type: "users",
        id: "2",
      },
      to: {
        type: "users",
        id: "1",
      },
      amount: 15,
      direction: "out",
    },
    {
      id: "6",
      createdAt: 1592253028,
      subject: "Paycheck",
      from: {
        type: "users",
        id: "2",
      },
      to: {
        type: "users",
        id: "1",
      },
      amount: 2200,
      direction: "in",
      type: "paycheck",
    },
    {
      id: "6",
      createdAt: 1592253028,
      subject: "Thank you for lending",
      from: {
        type: "users",
        id: "2",
      },
      to: {
        type: "users",
        id: "1",
      },
      amount: 120,
      direction: "in",
    },
  ];
  const { subscribe, set, update } = writable(data);

  return {
    subscribe,
    byId: (id: string) => data.find((o) => o.id === id),
    reset: () => set([]),
  };
}

export const transactions = createStore();
