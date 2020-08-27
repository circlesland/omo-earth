/**
 * Singleton that stores runtime instances of @{AddressableComponents}.
 * Runtime instances should register themselves on creation and should unregister onDestroy.
 */
import type {AddressableComponent, Component} from "./interfaces/component";

export type RuntimeInstanceReference = {definition:Component, viewInstance?:any};

export class RuntimeInstances
{
  private static _instance;

  public static instance() {
    if (!RuntimeInstances._instance)
      RuntimeInstances._instance = new RuntimeInstances();
    return RuntimeInstances._instance;
  }

  private readonly _instances:{[id:string]:RuntimeInstanceReference} = {};

  private constructor()
  {
  }

  add(addressableComponent:AddressableComponent, reference:RuntimeInstanceReference) {
    this._instances[addressableComponent.id] = reference;
    console.log("RuntimeInstances.instance().add(addressableComponent:" + JSON.stringify(addressableComponent) + ", reference: " + !!reference + ")")
  }

  remove(addressableComponent:AddressableComponent) {
    delete this._instances[addressableComponent.id];
  }
}