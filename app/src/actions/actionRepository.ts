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
import {LoggedOn} from "../trigger/auth/loggedOn";
import type {ExchangeMagicLoginCodeForJwt} from "../trigger/auth/exchangeMagicLinkCodeForJwt";

let sideBarToggleState:boolean = true;

export const jwtLocalStorageKey = "magic-login-jwt";

const externalUrl = "__PROXY_PROTOCOL__" + "__PROXY_EXTERN_DOMAIN__" + ":" + "__PROXY_EXTERN_PORT__";
const config = {
  auth: {
    url: externalUrl + "/auth",
    appId: "1"
  },
  keyStoreServerUrl: externalUrl + "/keystore"
};

const parseXhrResponse = (xhr:XMLHttpRequest, method:string) => {
  let responseObject;
  try
  {
    responseObject = JSON.parse(xhr.responseText);
    if (!responseObject || !responseObject.data)
      throw new Error("JSON.parse() returned a malformed or empty object. Input was: " + xhr.responseText);

    if (!responseObject.data[method].success)
      throw new Error("A request was completed with an error: " + responseObject.data.exchangeToken.errorMessage);

    window.trigger(new LoggedOn(""));
  }
  catch (e)
  {
    throw new Error("Couldn't process the response.");
  }
  return responseObject;
}

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
  [Actions.exchangeMagicLoginCodeForJwt]: (trigger:ExchangeMagicLoginCodeForJwt) => {
    const payload = {
      "operationName": null,
      "variables": {},
      "query": "mutation { verify(oneTimeToken: \"" + trigger.oneTimeToken + "\") { success errorMessage jwt }}"
    };

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.open("POST", "http://omo.local:8080/auth");
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify(payload));
    xhr.onreadystatechange = (e) => {
      if (xhr.readyState !== XMLHttpRequest.DONE) {
        return;
      }
      const responseData = JSON.parse(xhr.response);
      if (responseData.data){
        localStorage.setItem(jwtLocalStorageKey, responseData.data.verify.jwt);
        window.close();
      }
      if (responseData.errors){
        alert("Couldn't login. Please try again");
      }
    }
  },
  /**
   * Requests a magic login link for an email address.
   * @param trigger
   */
  [Actions.requestMagicLoginLink]:(trigger:RequestMagicLoginLink) => {
    const payload = {
      "operationName": null,
      "variables": {},
      "query": "mutation { login(appId: \"" + config.auth.appId + "\", emailAddress: \"" + trigger.emailAddress + "\") { success errorMessage }}"
    };

    // Below we're waiting for a new JWT so any pre-existing JWT must be deleted first.
    localStorage.removeItem(jwtLocalStorageKey);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", config.auth.url);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify(payload));
    xhr.onreadystatechange = (e) => {
      if (xhr.readyState !== XMLHttpRequest.DONE)
        return; // We're only interested in the final result ..

      parseXhrResponse(xhr, "login");

      // When we got a result with "success" == true,
      // Wait for the user to click the magic link.
      // The magic-link's target will exchange the one time code
      // with a JWT. This is what we're waiting for (100ms polling).
      var checker = setInterval(() => {
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
        clearInterval(checker);
      }, 100);
    }
  },
  [Actions.exchangeJwtForSessionCookie]: (trigger:ExchangeJwtForSessionCookie) => {
    const payload = {
      "operationName": null,
      "variables": {},
      "query": "mutation { exchangeToken(jwt:\"" + trigger.jwt + "\") { success errorMessage }}"
    };

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.open("POST", config.keyStoreServerUrl);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify(payload));
    xhr.onreadystatechange = (e) => {
      if (xhr.readyState !== XMLHttpRequest.DONE)
        return; // We're only interested in the final result ..

      parseXhrResponse(xhr, "exchangeToken");

      localStorage.removeItem(jwtLocalStorageKey);
      window.trigger(new NavigateTo("To safe", "/safe"));
    }
  }
}