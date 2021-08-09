import {MigrationInterface, QueryRunner} from "typeorm";

export class AddTables1628360157794 implements MigrationInterface {
    name = 'AddTables1628360157794'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "donate" DROP CONSTRAINT "FK_1d5c852082a3e2134831e4d8058"`);
        await queryRunner.query(`CREATE TYPE "category_name_enum" AS ENUM('Art', 'Comics', 'Crafts', 'Dance', 'Design', 'Fashion', 'Film & Video', 'Food', 'Games', 'Journalism', 'Music', 'Photography', 'Publishing', 'Technology', 'Theater')`);
        await queryRunner.query(`CREATE TABLE "category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" "category_name_enum" NOT NULL, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "user_project_mark_enum" AS ENUM('like', 'dislike')`);
        await queryRunner.query(`CREATE TABLE "user_project" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "IsWatched" boolean NOT NULL, "mark" "user_project_mark_enum" NOT NULL, "userId" uuid, "projectId" uuid, CONSTRAINT "PK_72a40468c3924e43b934542e8e4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tag" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" text NOT NULL, CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "project_tag" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "tagId" uuid, "projectId" uuid, CONSTRAINT "PK_cc4c953ce52d1444e42947ea0df" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "message" text NOT NULL, "messageLinkId" uuid, "authorId" uuid, "parentCommentId" uuid, CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "message" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "text" text NOT NULL, "chatId" uuid, "authorId" uuid, CONSTRAINT "PK_ba01f0a3e0123651915008bc578" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "chat" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "teamId" uuid, "donatorId" uuid, CONSTRAINT "PK_9d0b2ba74336710fd31154738a5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "team" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" text NOT NULL, "projectId" uuid, CONSTRAINT "REL_2defea9edb26358ff53c172ee2" UNIQUE ("projectId"), CONSTRAINT "PK_f57d8293406df4af348402e4b74" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "faq" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "question" text NOT NULL, "answer" text NOT NULL, "projectId" uuid, CONSTRAINT "PK_d6f5a52b1a96dd8d0591f9fbc47" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "project" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" text NOT NULL, "description" text NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "goal" numeric NOT NULL, "startDate" TIMESTAMP NOT NULL, "finishDate" TIMESTAMP NOT NULL, "totalViews" integer NOT NULL, "minutesToRead" real NOT NULL, "totalInteractionTime" real NOT NULL, "region" text NOT NULL, "categoryId" uuid, "teamId" uuid, CONSTRAINT "REL_d0474b642dc0ae63660dd8e2ac" UNIQUE ("teamId"), CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "alerts_settings" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "frequency" integer NOT NULL, "unit" text NOT NULL, "userId" uuid, CONSTRAINT "REL_3855681ab0de61ff62a3912451" UNIQUE ("userId"), CONSTRAINT "PK_9d3e79f8664955c374c0170379b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_achievement" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "progress" real NOT NULL, "userId" uuid, "achievementId" uuid, CONSTRAINT "PK_99df4f0afe2d706c05004854aa5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "achievement" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "description" text NOT NULL, "goal" numeric NOT NULL, CONSTRAINT "PK_441339f40e8ce717525a381671e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "project_donators_privilege" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "donatorsPrivilegeId" uuid, "projectId" uuid, CONSTRAINT "PK_42e9edff3c5cd7c1998ad9aa638" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "donators_privilege" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "privilege" text NOT NULL, "amount" numeric NOT NULL, CONSTRAINT "PK_c6eeeb5c492db953883d44f86db" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "donate" DROP COLUMN "userProfileId"`);
        await queryRunner.query(`ALTER TABLE "donate" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "donate" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "donate" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "donate" ADD "projectId" uuid`);
        await queryRunner.query(`ALTER TABLE "user_profile" ADD "alertsSettingsId" uuid`);
        await queryRunner.query(`ALTER TABLE "user_profile" ADD CONSTRAINT "UQ_29ccc1a897bbc6530cc88e8a991" UNIQUE ("alertsSettingsId")`);
        await queryRunner.query(`ALTER TABLE "donate" DROP COLUMN "amount"`);
        await queryRunner.query(`ALTER TABLE "donate" ADD "amount" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_profile" DROP COLUMN "balance"`);
        await queryRunner.query(`ALTER TABLE "user_profile" ADD "balance" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_project" ADD CONSTRAINT "FK_b88a18e4faeea3bce60d70a4ae3" FOREIGN KEY ("userId") REFERENCES "user_profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_project" ADD CONSTRAINT "FK_cb5415b5e54f476329451212e9b" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project_tag" ADD CONSTRAINT "FK_d22558732b873ca528a9583112e" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project_tag" ADD CONSTRAINT "FK_f6afd36d4272eba4e94907feea9" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_256529b489690e40c29d955006c" FOREIGN KEY ("messageLinkId") REFERENCES "message"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_276779da446413a0d79598d4fbd" FOREIGN KEY ("authorId") REFERENCES "user_profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_73aac6035a70c5f0313c939f237" FOREIGN KEY ("parentCommentId") REFERENCES "comment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_619bc7b78eba833d2044153bacc" FOREIGN KEY ("chatId") REFERENCES "chat"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_c72d82fa0e8699a141ed6cc41b3" FOREIGN KEY ("authorId") REFERENCES "user_profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "chat" ADD CONSTRAINT "FK_42ddb9d3902f95127a1dc277de7" FOREIGN KEY ("teamId") REFERENCES "team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "chat" ADD CONSTRAINT "FK_ffb843b9809d869cb26ee4dc521" FOREIGN KEY ("donatorId") REFERENCES "user_profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "team" ADD CONSTRAINT "FK_2defea9edb26358ff53c172ee28" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "faq" ADD CONSTRAINT "FK_e6bbb874645bad49ca675535ae6" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project" ADD CONSTRAINT "FK_3caef906211aad45559039f11f9" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project" ADD CONSTRAINT "FK_d0474b642dc0ae63660dd8e2ac0" FOREIGN KEY ("teamId") REFERENCES "team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "donate" ADD CONSTRAINT "FK_0f2468227078e2b5235040bdfcb" FOREIGN KEY ("userId") REFERENCES "user_profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "donate" ADD CONSTRAINT "FK_1d955430d62a2c7d82e7dd48d1d" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "alerts_settings" ADD CONSTRAINT "FK_3855681ab0de61ff62a3912451c" FOREIGN KEY ("userId") REFERENCES "user_profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_profile" ADD CONSTRAINT "FK_29ccc1a897bbc6530cc88e8a991" FOREIGN KEY ("alertsSettingsId") REFERENCES "alerts_settings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_achievement" ADD CONSTRAINT "FK_2a418515c335cab7c5ba70c28b3" FOREIGN KEY ("userId") REFERENCES "user_profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_achievement" ADD CONSTRAINT "FK_843ecd1965f1aac694875674a18" FOREIGN KEY ("achievementId") REFERENCES "achievement"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project_donators_privilege" ADD CONSTRAINT "FK_f4c606a3fd7a5dbee546b959d3f" FOREIGN KEY ("donatorsPrivilegeId") REFERENCES "donators_privilege"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project_donators_privilege" ADD CONSTRAINT "FK_6361229017c4b10ec8a79f78a50" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project_donators_privilege" DROP CONSTRAINT "FK_6361229017c4b10ec8a79f78a50"`);
        await queryRunner.query(`ALTER TABLE "project_donators_privilege" DROP CONSTRAINT "FK_f4c606a3fd7a5dbee546b959d3f"`);
        await queryRunner.query(`ALTER TABLE "user_achievement" DROP CONSTRAINT "FK_843ecd1965f1aac694875674a18"`);
        await queryRunner.query(`ALTER TABLE "user_achievement" DROP CONSTRAINT "FK_2a418515c335cab7c5ba70c28b3"`);
        await queryRunner.query(`ALTER TABLE "user_profile" DROP CONSTRAINT "FK_29ccc1a897bbc6530cc88e8a991"`);
        await queryRunner.query(`ALTER TABLE "alerts_settings" DROP CONSTRAINT "FK_3855681ab0de61ff62a3912451c"`);
        await queryRunner.query(`ALTER TABLE "donate" DROP CONSTRAINT "FK_1d955430d62a2c7d82e7dd48d1d"`);
        await queryRunner.query(`ALTER TABLE "donate" DROP CONSTRAINT "FK_0f2468227078e2b5235040bdfcb"`);
        await queryRunner.query(`ALTER TABLE "project" DROP CONSTRAINT "FK_d0474b642dc0ae63660dd8e2ac0"`);
        await queryRunner.query(`ALTER TABLE "project" DROP CONSTRAINT "FK_3caef906211aad45559039f11f9"`);
        await queryRunner.query(`ALTER TABLE "faq" DROP CONSTRAINT "FK_e6bbb874645bad49ca675535ae6"`);
        await queryRunner.query(`ALTER TABLE "team" DROP CONSTRAINT "FK_2defea9edb26358ff53c172ee28"`);
        await queryRunner.query(`ALTER TABLE "chat" DROP CONSTRAINT "FK_ffb843b9809d869cb26ee4dc521"`);
        await queryRunner.query(`ALTER TABLE "chat" DROP CONSTRAINT "FK_42ddb9d3902f95127a1dc277de7"`);
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_c72d82fa0e8699a141ed6cc41b3"`);
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_619bc7b78eba833d2044153bacc"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_73aac6035a70c5f0313c939f237"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_276779da446413a0d79598d4fbd"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_256529b489690e40c29d955006c"`);
        await queryRunner.query(`ALTER TABLE "project_tag" DROP CONSTRAINT "FK_f6afd36d4272eba4e94907feea9"`);
        await queryRunner.query(`ALTER TABLE "project_tag" DROP CONSTRAINT "FK_d22558732b873ca528a9583112e"`);
        await queryRunner.query(`ALTER TABLE "user_project" DROP CONSTRAINT "FK_cb5415b5e54f476329451212e9b"`);
        await queryRunner.query(`ALTER TABLE "user_project" DROP CONSTRAINT "FK_b88a18e4faeea3bce60d70a4ae3"`);
        await queryRunner.query(`ALTER TABLE "user_profile" DROP COLUMN "balance"`);
        await queryRunner.query(`ALTER TABLE "user_profile" ADD "balance" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "donate" DROP COLUMN "amount"`);
        await queryRunner.query(`ALTER TABLE "donate" ADD "amount" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_profile" DROP CONSTRAINT "UQ_29ccc1a897bbc6530cc88e8a991"`);
        await queryRunner.query(`ALTER TABLE "user_profile" DROP COLUMN "alertsSettingsId"`);
        await queryRunner.query(`ALTER TABLE "donate" DROP COLUMN "projectId"`);
        await queryRunner.query(`ALTER TABLE "donate" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "donate" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "donate" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "donate" ADD "userProfileId" uuid`);
        await queryRunner.query(`DROP TABLE "donators_privilege"`);
        await queryRunner.query(`DROP TABLE "project_donators_privilege"`);
        await queryRunner.query(`DROP TABLE "achievement"`);
        await queryRunner.query(`DROP TABLE "user_achievement"`);
        await queryRunner.query(`DROP TABLE "alerts_settings"`);
        await queryRunner.query(`DROP TABLE "project"`);
        await queryRunner.query(`DROP TABLE "faq"`);
        await queryRunner.query(`DROP TABLE "team"`);
        await queryRunner.query(`DROP TABLE "chat"`);
        await queryRunner.query(`DROP TABLE "message"`);
        await queryRunner.query(`DROP TABLE "comment"`);
        await queryRunner.query(`DROP TABLE "project_tag"`);
        await queryRunner.query(`DROP TABLE "tag"`);
        await queryRunner.query(`DROP TABLE "user_project"`);
        await queryRunner.query(`DROP TYPE "user_project_mark_enum"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TYPE "category_name_enum"`);
        await queryRunner.query(`ALTER TABLE "donate" ADD CONSTRAINT "FK_1d5c852082a3e2134831e4d8058" FOREIGN KEY ("userProfileId") REFERENCES "user_profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}