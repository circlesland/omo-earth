import { writable } from "svelte/store";

function createStore() {
  const data = [
    {
      id: "1234",
      name: "Fridge",
      category: "household",
      price: "800 ø",
      description:
        "totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasiarchitecto beatae vitae dicta sunt explicabo",
      group: "OrgaName",
      image: "https://source.unsplash.com/Eb6hMEhGlKY",
      tags: [
        {
          type: "cities",
          id: "1",
        },
        {
          type: "users",
          id: "2",
        },
      ],
    },
    {
      id: "12345",
      name: "Scooter",
      category: "mobility",
      price: "1050 ø",
      description:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium",
      group: "OrgaName",
      image: "https://source.unsplash.com/I6lCxYNqnrs",
      tags: [
        {
          type: "cities",
          id: "2",
        },
      ],
    },
    {
      id: "123456",
      name: "Shoes",
      category: "clothes",
      price: "125 ø",
      description:
        "Architecto beatae vitae dicta sunt explicabo, architecto beatae vitae dicta sunt explicabo.",
      group: "OrgaName",
      image: "https://source.unsplash.com/E-0ON3VGrBc",
      tags: [
        {
          type: "cities",
          id: "3",
        },
        {
          type: "cities",
          id: "2",
        },
      ],
    },
  ];
  const { subscribe, set, update } = writable(data);

  return {
    subscribe,
    byId: (id: string) => data.find((o) => o.id === id),
    add: (product: any) => update((n) => [...n, product]),
    reset: () => set([]),
  };
}

export const products = createStore();
