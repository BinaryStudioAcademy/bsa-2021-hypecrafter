import {MigrationInterface, QueryRunner} from "typeorm";

export class updateDonatorPrivilege1629724796604 implements MigrationInterface {
    name = 'updateDonatorPrivilege1629724796604'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "donators_privilege" DROP COLUMN "privilege"`);
        await queryRunner.query(`ALTER TABLE "donators_privilege" ADD "title" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "donators_privilege" ADD "content" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "donators_privilege" ADD "includes" text array NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "donators_privilege" DROP COLUMN "includes"`);
        await queryRunner.query(`ALTER TABLE "donators_privilege" DROP COLUMN "content"`);
        await queryRunner.query(`ALTER TABLE "donators_privilege" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "donators_privilege" ADD "privilege" text NOT NULL`);
    }

}
