CREATE TABLE "public"."Apps" (
    "id" SERIAL,
    "appId" text   NOT NULL ,
    "originHeaderValue" text   NOT NULL ,
    "validFrom" timestamp(3)   NOT NULL ,
    "validTo" timestamp(3)   ,
    PRIMARY KEY ("id")
);

CREATE TABLE "public"."Challenges" (
    "id" SERIAL,
    "validTo" timestamp(3)   NOT NULL ,
    "email" text   NOT NULL ,
    "appId" text   NOT NULL ,
    "challenge" text   NOT NULL ,
    "done" boolean   NOT NULL ,
    PRIMARY KEY ("id")
);

CREATE TABLE "public"."KeyPairs" (
    "id" SERIAL,
    "validFrom" timestamp(3)   NOT NULL ,
    "validTo" timestamp(3)   NOT NULL ,
    "privateKeyPem" text   NOT NULL ,
    "publicKeyPem" text   NOT NULL ,
    "privateKeyJwk" text   NOT NULL ,
    "publicKeyJwk" text   NOT NULL ,
    PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Apps.appId_unique" ON "public"."Apps"("appId");

CREATE UNIQUE INDEX "UX_Challenges_Email_Challenge" ON "public"."Challenges"("email", "challenge");

INSERT INTO "Apps" ("appId", "originHeaderValue", "validFrom", "validTo")
            VALUES ('1', 'http://omo.local:8080', '2020-01-01', null);





CREATE TABLE "public"."Authority" (
                                      "id" SERIAL,
                                      "issuer" text   NOT NULL ,
                                      "appId" text   NOT NULL ,
                                      PRIMARY KEY ("id")
);

CREATE TABLE "public"."Identity" (
                                     "identityId" text   NOT NULL ,
                                     "challengeEmailAddress" text   ,
                                     "challengePublicKey" text   ,
                                     "indexEntryPrivateKey" text   ,
                                     "indexEntryPublicKey" text   NOT NULL ,
                                     "indexEntryKeyFingerprint" text   NOT NULL ,
                                     "indexEntryHash" text
);

CREATE TABLE "public"."Entry" (
                                  "entryHash" text   NOT NULL ,
                                  "nonce" text   NOT NULL ,
                                  "ownerFingerPrint" text   NOT NULL ,
                                  "content" text   NOT NULL
);

CREATE TABLE "public"."Session" (
                                    "sessionId" text   NOT NULL ,
                                    "createdAt" timestamp(3)   NOT NULL ,
                                    "maxLifetime" integer   NOT NULL ,
                                    "authorityId" integer   NOT NULL ,
                                    "identityIdentityId" text   NOT NULL
);

CREATE UNIQUE INDEX "Identity.identityId_unique" ON "public"."Identity"("identityId");

CREATE UNIQUE INDEX "Entry.entryHash_unique" ON "public"."Entry"("entryHash");

CREATE UNIQUE INDEX "Session.sessionId_unique" ON "public"."Session"("sessionId");

ALTER TABLE "public"."Session" ADD FOREIGN KEY ("authorityId") REFERENCES "public"."Authority"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "public"."Session" ADD FOREIGN KEY ("identityIdentityId") REFERENCES "public"."Identity"("identityId") ON DELETE CASCADE ON UPDATE CASCADE;



INSERT INTO "Authority" (issuer, "appId") VALUES ('http://omo.local:8080/auth', '1');