import {cities} from "./cities";
import {products} from "./products";
import {transactions} from "./transactions";
import {users} from "./users";

export const allStores = {
  findByTag(tag: { type: string; id: string }) {
    return this[tag.type].byId(tag.id);
  },
  cities,
  products,
  transactions,
  users
}