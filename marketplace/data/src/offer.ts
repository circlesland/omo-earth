import {prisma} from "./prisma";
import {Session} from "@omo/data/dist/session";

export class Offer {
  static async create(sessionId:string, name:string, description:string, price:number) {
  }

  static find() {
  }
}