import {MigrationInterface, QueryRunner} from "typeorm";

export class makeMarkNullable1629902207904 implements MigrationInterface {
    name = 'makeMarkNullable1629902207904'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_project" ALTER COLUMN "mark" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_project" ALTER COLUMN "mark" SET NOT NULL`);
    }

}
