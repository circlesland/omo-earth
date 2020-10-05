export interface PublicKey {
  pem: string
  fingerprint: string
}

export interface PrivateKey {
  pem: string
  fingerprint: string
}


export interface Entry {
  meta: {
    creator: PublicKey
    owner: PublicKey
    name?: string // A persistent name that identifies this and the previous objects (e.g. IPNS etc.)
    dataHash: string // Contains a SHA256 hash of the 'data' field (serialized with JSON.stringify and utf8 encoded).
    createdAt: Date // Contains the point in time when the object was created
    version: number // A one based version number (count(predecessor...) == version - 1)
    predecessor?: string // Contains the hash to the previous version's entry (if any)
  }
  data: {
    [index:string]:any
  }
}

export interface SignedEntry extends Entry {
  /**
   * A signature from the Agent that created the entry (meta.creator).
   */
  creatorSignature: {
    timestamp: Date
    metaHash: string  // Contains a SHA256 hash of the 'meta' field (serialized with JSON.stringify and utf8 encoded).
    signature: string // Contains the 'metaHash' value encrypted with the private-key counterpart to 'creator'.
  }
  /**
   * A signature from the Agent that took ownership of the entry (meta.owner).
   * Entries can be created by anyone. Only when the supposed owner signed the entry, it is confirmed to be owned by
   * meta.owner'.
   */
  ownerSignature?: {
    timestamp: Date
    metaHash: string  // Contains a SHA256 hash of the 'meta' field (serialized with JSON.stringify and utf8 encoded).
    signature: string // Contains the 'metaHash' value encrypted with the private-key counterpart to 'owner'.
  }
}

export interface PersistedEntry extends SignedEntry {
  /**
   * A IPFS compliant hash that is calculated from the (utf8) JSON serialization of the whole object.
   */
  hash: string
}

/**
 * Describes a public identity document.
 *
 * The document contains the identity's public key as well as the public keys of all userAgents
 * that have access to this identity.
 */
export interface Identity extends PersistedEntry {
  data: {
    userAgents: PublicKey[]
    recoveryAgents: PublicKey[]
  }
}