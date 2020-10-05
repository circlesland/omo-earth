import {Entry, PrivateKey, PublicKey, SignedEntry} from "./identity";

export type NewEntry = {
  meta: {
    owner: PublicKey
    creator: PublicKey
    name?: string
    version: number
    predecessor?: string
  }
}

export type Predecessor = NewEntry & {
  hash: string,
};

export class Test
{
  static spawnNewEntry(creator:PublicKey, owner:PublicKey, name?:string) {
    return <NewEntry>{
      meta: {
        creator,
        owner,
        version: 1,
        name
      }
    };
  }

  static spawnNextEntry(predecessor:Predecessor) {
    return <NewEntry>{
      meta: {
        owner: predecessor.meta.owner,
        creator: predecessor.meta.owner,
        version: predecessor.meta.version++,
        name: predecessor.meta.name,
        predecessor: predecessor.hash
      }
    };
  }
/*
  static sign(entry:Entry, privateKey:PrivateKey) : SignedEntry {

  }

  static main() {

  }
 */
}