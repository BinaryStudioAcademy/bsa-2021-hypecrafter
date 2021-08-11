import { MigrationInterface, QueryRunner } from 'typeorm';

export class addPasswordHashAndEmail1628118819902 implements MigrationInterface {
    name = 'addPasswordHashAndEmail1628118819902'

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE "user" ADD "passwordHash" character varying NOT NULL');
      await queryRunner.query('ALTER TABLE "user" ADD "email" character varying NOT NULL');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE "user" DROP COLUMN "email"');
      await queryRunner.query('ALTER TABLE "user" DROP COLUMN "passwordHash"');
    }
}
