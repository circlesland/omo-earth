import page from "page";
import {Actions} from "./actions";
import {NavigateTo} from "../trigger/navigateTo";
import type {DummyTrigger} from "../trigger/dummyTrigger";
import type {FilterBy} from "../trigger/filterBy";
import type {ToggleSideNav} from "../trigger/shell/toggleSideNav";
import {allStores} from "../stores/allStores";
import { get } from 'svelte/store';
import {library} from "../library";
import {DeviceClass} from "../interfaces/component";
import {SetLayout} from "../trigger/compositor/setLayout";
import {ResetLayout} from "../trigger/compositor/resetLayout";
import type {RequestMagicLoginLink} from "../trigger/auth/requestMagicLoginLink";
import {ExchangeJwtForSessionCookie} from "../trigger/auth/exchangeJwtForSessionCookie";
import type {ExchangeMagicLoginCodeForJwt} from "../trigger/auth/exchangeMagicLinkCodeForJwt";
import {AddKey} from "../trigger/keyStore/addKey";
import type {ImportKey} from "../trigger/keyStore/importKey";
import type {RemoveKey} from "../trigger/keyStore/removeKey";
import type {ShareKey} from "../trigger/keyStore/shareKey";
import jwt_decode from "jwt-decode";
import {users} from "../stores/users";
import {me} from "../stores/me";
import {authClient} from "../graphQL/auth/authClient";
import {keyStoreClient} from "../graphQL/keyStore/keyStoreClient";
import type {Entry} from "../graphQL/keyStore/generated";

let sideBarToggleState:boolean = true;

export const jwtLocalStorageKey = "magic-login-jwt";

const externalUrl = "__PROXY_PROTOCOL__" + "__PROXY_EXTERN_DOMAIN__" + ":" + "__PROXY_EXTERN_PORT__";

const conf = {
  auth: {
    url: externalUrl + "/auth",
    appId: "1"
  },
  keyStoreServerUrl: externalUrl + "/keystore"
};

export const config = conf;

export const actionRepository = {
  [Actions.dummyAction]:(trigger:DummyTrigger) => {
    console.warn("dummyAction(text:" + trigger.text + ") was triggered by DummyTrigger.")
  },
  [Actions.navigateTo]:(trigger:NavigateTo) => {
    page(trigger.to)
  },
  [Actions.toggleSideNav]:(trigger:ToggleSideNav) => {
    const deviceClass = library.runtime.getDeviceClass();
    if (sideBarToggleState){
      if (deviceClass === DeviceClass.mobile) {
        window.trigger(new SetLayout("content", "LayoutNav"));
      } else {
        window.trigger(new SetLayout("content", "LayoutMain"));
      }
    } else {
      window.trigger(new ResetLayout("content"));
    }
    sideBarToggleState = !sideBarToggleState;
  },
  [Actions.filterBy]:(trigger:FilterBy) => {
    const store = allStores[trigger.storeName];
    if (!store)
      throw new Error("Couldn't find a store with the name '" + trigger.storeName + "'");
  },
  /**
   * The user receives a one time code in the magic login email.
   * This function exchanges it for a JWT.
   * !! Since the link opens in a new browser tab, the received JWT must be
   * exchanged with the already running instance via localStorage. Events/Triggers
   * won't work !!
   */
  [Actions.exchangeMagicLoginCodeForJwt]: async (trigger:ExchangeMagicLoginCodeForJwt) => {
    const result =  await authClient.Verify({
      oneTimeToken: trigger.oneTimeToken
    });
    if (result.errors && result.errors.length > 0) {
      throw new Error(result.errors.map(o => o.message) .join("\n"));
    }

    localStorage.setItem(jwtLocalStorageKey, result.data.verify.jwt);
    window.close();
  },
  /**
   * Requests a magic login link for an email address.
   * @param trigger
   */
  [Actions.requestMagicLoginLink]:async (trigger:RequestMagicLoginLink) => {
    // Below we're waiting for a new JWT so any pre-existing JWT must be deleted first.
    localStorage.removeItem(jwtLocalStorageKey);

    if (checkForJwtIntervalHandle) {
      // Looks strange but prevents the interval from keeping running
      // a second time if the user requests the login link more than once
      // because of input lag or similar problems
      clearInterval(checkForJwtIntervalHandle);
    }
    var checkForJwtIntervalHandle: number|undefined;

    const result =  await authClient.Login({
      appId: conf.auth.appId,
      emailAddress: trigger.emailAddress
    });
    if (result.errors && result.errors.length > 0) {
      throw new Error(result.errors.map(o => o.message) .join("\n"));
    }

    // When we got a result with "success" == true,
    // Wait for the user to click the magic link.
    // The magic-link's target will exchange the one time code
    // with a JWT. This is what we're waiting for (100ms polling).
    checkForJwtIntervalHandle = setInterval(() => {
      if (!localStorage.getItem(jwtLocalStorageKey))
      {
        console.log("Waiting for user to follow the magic link ..");
        return;
      }

      // The JWT was written by the magic-login-link landingpage.
      // Send it via Trigger/Event and remove the entry from the local storage ..
      window.trigger(new ExchangeJwtForSessionCookie(localStorage.getItem(jwtLocalStorageKey)));
      localStorage.removeItem(jwtLocalStorageKey);
      // .. then stop the timer
      clearInterval(checkForJwtIntervalHandle);
    }, 100);
  },
  [Actions.exchangeJwtForSessionCookie]: async (trigger:ExchangeJwtForSessionCookie) => {

    const result =  await keyStoreClient.ExchangeToken({
      jwt: trigger.jwt
    });
    if (result.errors && result.errors.length > 0) {
      throw new Error(result.errors.map(o => o.message) .join("\n"));
    }
    if (!result.data.exchangeToken.success) {
      throw new Error("Couldn't exchange the JWT for a session at the keystore.")
    }

    const decodedJwt = jwt_decode(trigger.jwt);
    console.log("JWT:", decodedJwt);

    me.update(o => {
      o.content.email = decodedJwt.sub;
      return o;
    });
    localStorage.removeItem(jwtLocalStorageKey);

    window.trigger(new AddKey(Date.now().toString(), "privatekey", "publickey"));
    window.trigger(new NavigateTo("To safe", "/safe"));
  },
  [Actions.addKey]: async (trigger:AddKey) => {
    /*
    const keyEntry =  await keyStoreClient.CreateEntry({
      publicKey: trigger.publicKey,
      privateKey: trigger.privateKey,

    });
    if (keyEntry.errors && keyEntry.errors.length > 0) {
      throw new Error(keyEntry.errors.map(o => o.message) .join("\n"));
    }
    await KeyStoreClient.instance.importEntry(keyEntry.entryHash, trigger.name);

    const importedEntry = await keyStoreClient.ImportEntry({
      name: trigger.name,
      entryHash: keyEntry.entryHash
    });
    if (importedEntry.errors && importedEntry.errors.length > 0) {
      throw new Error(importedEntry.errors.map(o => o.message) .join("\n"));
    }
    */
  },
  [Actions.importKey]: async (trigger:ImportKey) => {
  },
  [Actions.removeKey]: async (trigger:RemoveKey) => {
  },
  [Actions.shareKey]: async (trigger:ShareKey) => {
    // 1) Read the key data
    // 2) Create a new entry with the key data and encrypt it with the recipient's key
  }
}