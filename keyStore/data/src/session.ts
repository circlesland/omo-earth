import {prisma} from "./prisma";
import {Client} from "@omo/auth-client/dist/client";
import {ValueGenerator} from "../../../auth/util/dist/valueGenerator";
import jsonwebtoken from 'jsonwebtoken';

export class Session
{
  static async findByValidSessionId(sessionId: string)
  {
    const session = await prisma.session.findOne({where: {sessionId}});
    if (!session)
      return null;

    const now = new Date();
    const expires = new Date(session.createdAt.getTime() + session.maxLifetime * 1000);

    if (expires.getTime() < now.getTime())
      return null;

    return session;
  }

  static async createSessionFromJWT(jwt:string)
  {
    const tokenPayload:any = jsonwebtoken.decode(jwt);
    if (!tokenPayload)
      throw new Error("Couldn't decode the supplied JWT.")

    const authorities = await prisma.authority.findMany({where:{issuer: tokenPayload.iss}});
    if (!authorities || authorities.length != 1)
      throw new Error("Couldn't find a specific authority for the 'iss' (issuer) of the JWT: The issuer in question is: '" + tokenPayload.iss + "'");

    const authority = authorities[0];
    const client = new Client(authority.appId, authority.issuer);

    // Verify the token and get the subject
    const sub = await client.verify(jwt);

    // Find an identity that matches the subject
    const identities = await prisma.identity.findMany({where:{challengeEmailAddress: sub}});
    if (!identities || identities.length != 1)
      throw new Error("Couldn't find an identity for the jwt's subject ('" + sub + "').");

    const identity = identities[0];

    const session = await prisma.session.create({
      data: {
        identity: {
          connect: {identityId: identity.identityId}
        },
        issuedBy: {
          connect: {id: authority.id}
        },
        createdAt: new Date(),
        maxLifetime: 600,
        sessionId: ValueGenerator.generateRandomBase64String(32)
      }
    });

    return session;
  }
}
