import {prisma} from "./prisma";

export class Identity
{
    static async findById(identityId: string)
    {
        return prisma.identity.findOne({where:{identityId: identityId}})
    }
}
