import { writable } from 'svelte/store';

function createStore() {
  console.log("creating 'me' store ..")
  const existingUser = sessionStorage.getItem("me");
  console.log("creating 'me' store .. Existing user (from sessionStorage): ", existingUser);

  const user : {email:string, [other:string]:any} =
    !!existingUser
    ? JSON.parse(existingUser)
    : {
      loggedOn: false,
      id: 1,
      email: "~you're_not@logged.on~",
    };

  console.log("creating 'me' store .. user is now: ", user);
  const { subscribe, set, update } = writable(user);

  return {
    subscribe,
    set,
    update
  };
}

export const me = createStore()

me.subscribe((s) => {
  console.log("persisting 'me' store to sessionStorage .. ");
  sessionStorage.setItem("me", JSON.stringify(s));
  console.log("Persisted ", s)
});