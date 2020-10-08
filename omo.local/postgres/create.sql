CREATE DATABASE "omo-auth";
\c "omo-auth";

create table "_Migration"
(
    revision           serial       not null
        constraint "_Migration_pkey"
            primary key,
    name               text         not null,
    datamodel          text         not null,
    status             text         not null,
    applied            integer      not null,
    rolled_back        integer      not null,
    datamodel_steps    text         not null,
    database_migration text         not null,
    errors             text         not null,
    started_at         timestamp(3) not null,
    finished_at        timestamp(3)
);

alter table "_Migration"
    owner to postgres;

create table "Challenges"
(
    id        serial       not null
        constraint "Challenges_pkey"
            primary key,
    "validTo" timestamp(3) not null,
    email     text         not null,
    challenge text         not null,
    done      boolean      not null,
    "appId"   text         not null
);

alter table "Challenges"
    owner to postgres;

create unique index "UX_Challenges_Email_Challenge"
    on "Challenges" (email, challenge);

create table "Apps"
(
    id                  serial       not null
        constraint "Apps_pkey"
            primary key,
    "originHeaderValue" text         not null,
    "validFrom"         timestamp(3) not null,
    "validTo"           timestamp(3),
    "appId"             text         not null
);

alter table "Apps"
    owner to postgres;

create unique index "Apps.appId_unique"
    on "Apps" ("appId");

create table "SigningKeyPairs"
(
    id              serial       not null
        constraint "SigningKeyPairs_pkey"
            primary key,
    "validFrom"     timestamp(3) not null,
    "validTo"       timestamp(3) not null,
    "privateKeyPem" text         not null,
    "publicKeyPem"  text         not null,
    "privateKeyJwk" text         not null,
    "publicKeyJwk"  text         not null
);

alter table "SigningKeyPairs"
    owner to postgres;


INSERT INTO "Apps" ("appId", "originHeaderValue", "validFrom", "validTo")
VALUES ('1', 'http://omo.local:8080', '2020-01-01', null);

CREATE DATABASE "omo-marketplace";
\c "omo-marketplace";

create table public."Offer"
(
    "ownerIdentityId" text                                   not null,
    name              text                                   not null,
    description       text                                   not null,
    price             numeric(65, 30)                        not null,
    "createdAt"       timestamp(3) default CURRENT_TIMESTAMP not null
);

alter table public."Offer"
    owner to postgres;

create unique index "Offer.ownerIdentityId_unique"
    on public."Offer" ("ownerIdentityId");


--CREATE DATABASE "omo-data";
\c "omo-data";

create table "_Migration"
(
    revision           serial       not null
        constraint "_Migration_pkey"
            primary key,
    name               text         not null,
    datamodel          text         not null,
    status             text         not null,
    applied            integer      not null,
    rolled_back        integer      not null,
    datamodel_steps    text         not null,
    database_migration text         not null,
    errors             text         not null,
    started_at         timestamp(3) not null,
    finished_at        timestamp(3)
);

alter table "_Migration"
    owner to postgres;

create table "Identity"
(
    "identityId"               text not null,
    "emailAddress"             text,
    "indexEntryPrivateKey"     text,
    "indexEntryPublicKey"      text not null,
    "indexEntryKeyFingerprint" text not null,
    "indexEntryHash"           text
);

alter table "Identity"
    owner to postgres;

create unique index "Identity.identityId_unique"
    on "Identity" ("identityId");

create table "Authority"
(
    id      serial not null
        constraint "Authority_pkey"
            primary key,
    issuer  text   not null,
    "appId" text   not null
);

alter table "Authority"
    owner to postgres;

create table "Session"
(
    "sessionId"          text         not null,
    "createdAt"          timestamp(3) not null,
    "maxLifetime"        integer      not null,
    "authorityId"        integer      not null
        constraint "Session_authorityId_fkey"
            references "Authority"
            on update cascade on delete cascade,
    "identityIdentityId" text         not null
        constraint "Session_identityIdentityId_fkey"
            references "Identity" ("identityId")
            on update cascade on delete cascade
);

alter table "Session"
    owner to postgres;

create unique index "Session.sessionId_unique"
    on "Session" ("sessionId");

create table "Entry"
(
    "creatorFingerPrint" text not null,
    "ownerFingerPrint"   text not null,
    "entryHash"          text not null,
    content              text not null
);

alter table "Entry"
    owner to postgres;

create unique index "Entry.entryHash_unique"
    on "Entry" ("entryHash");

-- TODO: Get URL from ENV
INSERT INTO "Authority" (issuer, "appId") VALUES ('http://omo.local:8080/auth', '1');