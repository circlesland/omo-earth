import {prisma} from "./prisma";

export class Entry
{
    static async findByHash(entryHash: string)
    {
        return prisma.entry.findOne({where:{entryHash}})
    }
}
