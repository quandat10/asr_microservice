import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableIndex,
} from "typeorm";

export class CreateTableUpload1622105251750 implements MigrationInterface {

    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "upload",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        length: "11",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "original_name",
                        type: "varchar",
                    },
                    {
                        name: "cloud_file_name",
                        type: "varchar",
                    },
                    {
                        name: "encoding",
                        type: "varchar",
                    },
                    {
                        name: "mimetype",
                        type: "varchar",
                    },
                    {
                        name: "bucket",
                        type: "varchar",
                    },
                    {
                        name: "size",
                        type: "int",
                    },
                    {
                        name: "user_code",
                        type: "varchar",
                        length: "12",
                    },
                    {
                        name: "link_url",
                        type: "varchar",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "current_timestamp()",
                    },
                ],
            }),
        );
        await queryRunner.createIndex("upload", new TableIndex({
            name: "cloud_file_name",
            columnNames: ["cloud_file_name"]
        }));
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("upload");
    }

}
