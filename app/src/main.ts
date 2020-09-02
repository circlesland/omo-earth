import App from "./App.svelte";
import {EventBroker, Topic} from "./eventBroker";

declare global
{
  interface Window
  {
    eventBroker: EventBroker;
    shellEvents: Topic<any>;
    trigger: (trigger:any) => void;
  }
}

const eventBroker = new EventBroker();
window.eventBroker = eventBroker;
window.shellEvents = eventBroker.createTopic("omo", "shell");
window.trigger = (trigger:any) => {
  if (trigger.id) {
    const topic = window.eventBroker.getTopic("omo", trigger.id);
    if (!topic) {
      throw new Error("There is no topic for component id '" + trigger.id + "'. Request is:" + JSON.stringify(trigger));
    }
    topic.publish(trigger);
    console.log("Publishing component event: ",trigger);
  } else {
    console.log("Publishing shell event: ",trigger);
    window.shellEvents.publish(trigger);
  }
}
window.shellEvents.observable.subscribe(event => {
  console.log("main.ts receive 'omo.shell' event:", event);
})

const app = new App({
  target: document.body,
});

export default app;
