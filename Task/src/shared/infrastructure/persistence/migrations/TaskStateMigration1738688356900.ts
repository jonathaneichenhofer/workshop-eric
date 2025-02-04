import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { OverwriteProtectionBody } from "@codebricks/typebricks";

export class TaskStateMigration1738688356900 implements MigrationInterface {
    name = 'TaskStateMigration1738688356900';

    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table(
                {
                    name: 'task_state',
                    columns: [
                        { name: 'aggregate_id', type: 'uuid', isPrimary: true },
                        { name: 'aggregate_version', type: 'int' },
                        { name: 'state', type: 'text' },
                    ],
                }
            )
        );
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('task_state');
    }
}
