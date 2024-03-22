import { MigrationInterface, QueryRunner } from 'typeorm'

export class $npmConfigName1711057610295 implements MigrationInterface {
  name = ' $npmConfigName1711057610295'

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "news_translation" DROP CONSTRAINT "FK_03a6155d79d5ea69f5114bf271a"`)
    await queryRunner.query(
      `ALTER TABLE "news_translation" ADD CONSTRAINT "FK_03a6155d79d5ea69f5114bf271a" FOREIGN KEY ("newsId") REFERENCES "news"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    )
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "news_translation" DROP CONSTRAINT "FK_03a6155d79d5ea69f5114bf271a"`)
    await queryRunner.query(
      `ALTER TABLE "news_translation" ADD CONSTRAINT "FK_03a6155d79d5ea69f5114bf271a" FOREIGN KEY ("newsId") REFERENCES "news"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }
}
