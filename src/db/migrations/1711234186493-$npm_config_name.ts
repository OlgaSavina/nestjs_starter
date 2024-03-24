import { MigrationInterface, QueryRunner } from 'typeorm'

export class $npmConfigName1711234186493 implements MigrationInterface {
  name = ' $npmConfigName1711234186493'

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "news" DROP CONSTRAINT "FK_12a76d9b0f635084194b2c6aa01"`)
    await queryRunner.query(
      `ALTER TABLE "news" ADD CONSTRAINT "FK_12a76d9b0f635084194b2c6aa01" FOREIGN KEY ("categoryId") REFERENCES "news_category"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    )
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "news" DROP CONSTRAINT "FK_12a76d9b0f635084194b2c6aa01"`)
    await queryRunner.query(
      `ALTER TABLE "news" ADD CONSTRAINT "FK_12a76d9b0f635084194b2c6aa01" FOREIGN KEY ("categoryId") REFERENCES "news_category"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    )
  }
}
