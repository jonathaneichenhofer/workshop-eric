import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { OverwriteProtectionBody } from "@codebricks/typebricks";

export class TaskOutboxMigration1738688356937 implements MigrationInterface {
    name = 'TaskOutboxMigration1738688356937';

    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table(
                {
                    name: 'task_outbox',
                    columns: [
                        { name: 'id', type: 'uuid', isPrimary: true },
                        { name: 'no', type: 'int', isNullable: true },
                        { name: 'name', type: 'varchar' },
                        { name: 'message', type: 'text' },
                    ],
                }
            )
        );
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('task_outbox');
    }
}
