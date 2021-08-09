/* eslint-disable */
import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateRelations1628407165448 implements MigrationInterface {
    name = 'UpdateRelations1628407165448'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_256529b489690e40c29d955006c"`);
        await queryRunner.query(`ALTER TABLE "comment" RENAME COLUMN "messageLinkId" TO "projectId"`);
        await queryRunner.query(`ALTER TABLE "user_project" RENAME COLUMN "IsWatched" TO "isWatched"`);
        await queryRunner.query(`ALTER TABLE "alerts_settings" DROP COLUMN "unit"`);
        await queryRunner.query(`ALTER TABLE "tag" ADD "authorId" uuid`);
        await queryRunner.query(`ALTER TABLE "project" ADD "content" character varying`);
        await queryRunner.query(`ALTER TABLE "project" ADD "authorId" uuid`);
        await queryRunner.query(`ALTER TABLE "alerts_settings" ADD "isActive" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "alerts_settings" ADD "time" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "tag" ADD CONSTRAINT "UQ_6a9775008add570dc3e5a0bab7b" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "totalInteractionTime"`);
        await queryRunner.query(`ALTER TABLE "project" ADD "totalInteractionTime" real NOT NULL`);
        await queryRunner.query(`ALTER TABLE "alerts_settings" DROP COLUMN "frequency"`);
        await queryRunner.query(`CREATE TYPE "alerts_settings_frequency_enum" AS ENUM('0', '1', '2', '3', '4', '5', '6', '7')`);
        await queryRunner.query(`ALTER TABLE "alerts_settings" ADD "frequency" "alerts_settings_frequency_enum" NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "user_profile" ALTER COLUMN "firstName" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_profile" ALTER COLUMN "lastName" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_profile" ALTER COLUMN "phoneNumber" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_profile" ALTER COLUMN "description" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_profile" ALTER COLUMN "region" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_61e5bdd38addac8d6219ca102ee" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tag" ADD CONSTRAINT "FK_9e7e912c496407e930276dff88c" FOREIGN KEY ("authorId") REFERENCES "user_profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project" ADD CONSTRAINT "FK_e89415fe16e98680d18ec760358" FOREIGN KEY ("authorId") REFERENCES "user_profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" DROP CONSTRAINT "FK_e89415fe16e98680d18ec760358"`);
        await queryRunner.query(`ALTER TABLE "tag" DROP CONSTRAINT "FK_9e7e912c496407e930276dff88c"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_61e5bdd38addac8d6219ca102ee"`);
        await queryRunner.query(`ALTER TABLE "user_profile" ALTER COLUMN "region" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_profile" ALTER COLUMN "description" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_profile" ALTER COLUMN "phoneNumber" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_profile" ALTER COLUMN "lastName" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_profile" ALTER COLUMN "firstName" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "alerts_settings" DROP COLUMN "frequency"`);
        await queryRunner.query(`DROP TYPE "alerts_settings_frequency_enum"`);
        await queryRunner.query(`ALTER TABLE "alerts_settings" ADD "frequency" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "totalInteractionTime"`);
        await queryRunner.query(`ALTER TABLE "project" ADD "totalInteractionTime" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tag" DROP CONSTRAINT "UQ_6a9775008add570dc3e5a0bab7b"`);
        await queryRunner.query(`ALTER TABLE "alerts_settings" DROP COLUMN "time"`);
        await queryRunner.query(`ALTER TABLE "alerts_settings" DROP COLUMN "isActive"`);
        await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "authorId"`);
        await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "content"`);
        await queryRunner.query(`ALTER TABLE "tag" DROP COLUMN "authorId"`);
        await queryRunner.query(`ALTER TABLE "alerts_settings" ADD "unit" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_project" RENAME COLUMN "isWatched" TO "IsWatched"`);
        await queryRunner.query(`ALTER TABLE "comment" RENAME COLUMN "projectId" TO "messageLinkId"`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_256529b489690e40c29d955006c" FOREIGN KEY ("messageLinkId") REFERENCES "message"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
