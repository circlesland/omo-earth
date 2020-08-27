import { writable } from 'svelte/store';

function createStore() {
  const data = [
    {
      id: "1234",
      name: "Banana",
      category: "food",
      price: "20 ø",
      description: "product description",
      group: "OrgaName",
      image: "https://source.unsplash.com/featured/?banana",
      tags:[{
        type: "cities",
        id: "1"
      },{
        type: "users",
        id: "2"
      }]
    },
    {
      id: "12345",
      name: "Shoe",
      category: "clothing",
      price: "50 ø",
      description: "product description",
      group: "OrgaName",
      image: "https://source.unsplash.com/featured/?shoe",
      tags:[{
        type: "cities",
        id: "2"
      }]
    },
    {
      id: "123456",
      name: "Appartment",
      category: "living",
      price: "100.000 ø",
      description: "product description",
      group: "OrgaName",
      image: "https://source.unsplash.com/featured/?appartment",
      tags:[{
        type: "cities",
        id: "3"
      },{
        type: "cities",
        id: "2"
      }]
    },
  ];
  const { subscribe, set, update } = writable(data);

  return {
    subscribe,
    byId: (id:string) => data.find(o => o.id === id),
    add: (product:any) => update(n => [...n, product]),
    reset: () => set([])
  };
}

export const products = createStore()