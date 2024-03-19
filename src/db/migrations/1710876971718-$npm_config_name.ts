import { MigrationInterface, QueryRunner } from 'typeorm'

export class $npmConfigName1710876971718 implements MigrationInterface {
  name = ' $npmConfigName1710876971718'

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "news_category_translation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "language" character varying NOT NULL, "title" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "categoryId" uuid, CONSTRAINT "PK_04add7dee88ce1084a008c683fb" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `ALTER TABLE "news_category_translation" ADD CONSTRAINT "FK_a1e3edb3b4a8043170b56a50558" FOREIGN KEY ("categoryId") REFERENCES "news_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "news_category_translation" DROP CONSTRAINT "FK_a1e3edb3b4a8043170b56a50558"`)
    await queryRunner.query(`DROP TABLE "news_category_translation"`)
  }
}
