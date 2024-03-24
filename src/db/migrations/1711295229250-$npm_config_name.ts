import { MigrationInterface, QueryRunner } from 'typeorm'

export class $npmConfigName1711295229250 implements MigrationInterface {
  name = ' $npmConfigName1711295229250'

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "appeal" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`)
    await queryRunner.query(`ALTER TABLE "appeal" ADD CONSTRAINT "PK_f644a99d2dfcff9facb08bd1697" PRIMARY KEY ("id")`)
    await queryRunner.query(`ALTER TABLE "appeal" ADD "email" character varying NOT NULL`)
    await queryRunner.query(`ALTER TABLE "appeal" ADD "finished_at" TIMESTAMP NOT NULL`)
    await queryRunner.query(`ALTER TABLE "appeal" ADD "type" "public"."appeal_type_enum" NOT NULL`)
    await queryRunner.query(`ALTER TABLE "appeal" ADD "ipn" character varying(10) NOT NULL`)
    await queryRunner.query(`ALTER TABLE "appeal" ADD "age" integer NOT NULL`)
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "appeal" DROP CONSTRAINT "PK_f644a99d2dfcff9facb08bd1697"`)
    await queryRunner.query(`ALTER TABLE "appeal" DROP COLUMN "id"`)
    await queryRunner.query(`ALTER TABLE "appeal" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`)
    await queryRunner.query(`ALTER TABLE "appeal" ADD CONSTRAINT "PK_f644a99d2dfcff9facb08bd1697" PRIMARY KEY ("id")`)
  }
}
