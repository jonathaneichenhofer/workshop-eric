import { DataSource } from "typeorm";
import { TaskEventStreamEntity } from "shared/infrastructure/persistence/aggregate/TaskEventStreamEntity";
import { TaskOutboxEntity } from "shared/infrastructure/publishing/TaskOutboxEntity";
import { TaskStateEntity } from "shared/infrastructure/persistence/aggregate/TaskStateEntity";

export const TestAppDataSource = new DataSource({
    type: 'postgres',
    port: process.env.POSTGRES_PORT ? parseInt(process.env.POSTGRES_PORT) : 5432,
    logging: false,
    synchronize: false,
    url: process.env.POSTGRES_URL,
    migrationsTableName: 'task_migrations',
    extra: {
        ssl: {
            rejectUnauthorized: false
        }
    },
    entities: [
        TaskEventStreamEntity,
        TaskOutboxEntity,
        TaskStateEntity,
    ],
});

export async function initDataSource(): Promise<void> {
    if (!TestAppDataSource.isInitialized) {
        await TestAppDataSource.initialize()
        .then(() => {})
        .catch((err: any) => {
            console.error("Error during Data Source initialization", err);
        });
    }
}

export async function destroyDataSource(): Promise<void> {
    if (TestAppDataSource.isInitialized) {
        await TestAppDataSource.destroy();
    }
}
