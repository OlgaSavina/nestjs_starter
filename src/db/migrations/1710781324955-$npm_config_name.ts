import { MigrationInterface, QueryRunner } from 'typeorm'

export class $npmConfigName1710781324955 implements MigrationInterface {
  name = ' $npmConfigName1710781324955'

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "news_translation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "language" character varying NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "newsId" uuid, CONSTRAINT "PK_7c332d415ea0fafe4cdb4de581a" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `ALTER TABLE "news_translation" ADD CONSTRAINT "FK_03a6155d79d5ea69f5114bf271a" FOREIGN KEY ("newsId") REFERENCES "news"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "news_translation" DROP CONSTRAINT "FK_03a6155d79d5ea69f5114bf271a"`)
    await queryRunner.query(`DROP TABLE "news_translation"`)
  }
}
