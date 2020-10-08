import {PrismaClient} from "@prisma/client";

export const prisma: PrismaClient = new PrismaClient({
    datasources: {
        db: {
            url: "postgresql://" + process.env.MARKETPLACE_POSTGRES_USER + ":" + process.env.MARKETPLACE_POSTGRES_PASSWORD + "@" + process.env.MARKETPLACE_POSTGRES_HOST + ":5432/" + process.env.MARKETPLACE_POSTGRES_DB + "?schema=public"
        }
    }
});
