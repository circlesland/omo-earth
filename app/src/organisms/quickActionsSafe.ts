import { NavigateTo } from "../trigger/navigateTo";

export const quickActionsSafe = [
  new NavigateTo("Safe", "/safe", "fa-user-shield"),
  new NavigateTo("Market", "/market", "fa-store"),
  new NavigateTo("People", "/", "fa-users"),
];
