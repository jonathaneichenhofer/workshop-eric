import { Projector, ProjectMethods, OverwriteProtectionBody } from "@codebricks/typebricks";
import { defaultTaskOverview, TaskOverview } from "shared/application/readmodels/TaskOverview";
import { TaskOverviewRepository, TaskOverviewRepositoryMethods } from "../infrastructure/TaskOverviewRepository";
import { TaskAddedEventMessage } from "shared/application/inboundEvents/TaskAddedEventMessage";
import { TaskCompletedEventMessage } from "shared/application/inboundEvents/TaskCompletedEventMessage";
import { TaskStatusEnum } from "shared/domain/enums/TaskStatusEnum";

export class TaskOverviewProjector extends Projector {
    readonly projectionName: string = 'TaskOverview';
    readonly projectMethods: ProjectMethods = {
        'Task.Task.TaskAdded': this.projectTaskTaskTaskAdded.bind(this),
        'Task.Task.TaskCompleted': this.projectTaskTaskTaskCompleted.bind(this)
    };
    readonly streamNames: string[] = ['Task.Task'];

    constructor(readonly repository: TaskOverviewRepository = new TaskOverviewRepository()) {
        super(repository);
    }

    @OverwriteProtectionBody(false)
    async projectTaskTaskTaskAdded(eventMessage: TaskAddedEventMessage, methods: TaskOverviewRepositoryMethods): Promise<void> {
        const existingProjectedEntity: TaskOverview | null = await methods.getOne({
            where: {
                taskId: eventMessage.aggregateId,
            }
        });
        const projectedEntity: TaskOverview = this.applyTaskTaskTaskAdded(existingProjectedEntity, eventMessage);
        await methods.updateOne(projectedEntity);
    }

    @OverwriteProtectionBody(false)
    async projectTaskTaskTaskCompleted(eventMessage: TaskCompletedEventMessage, methods: TaskOverviewRepositoryMethods): Promise<void> {
        const existingProjectedEntity: TaskOverview | null = await methods.getOne({
            where: {
                taskId: eventMessage.aggregateId,
            }
        });
        const projectedEntity: TaskOverview = this.applyTaskTaskTaskCompleted(existingProjectedEntity, eventMessage);
        await methods.updateOne(projectedEntity);
    }

    @OverwriteProtectionBody(false)
    applyTaskTaskTaskAdded(existingProjectedEntity: TaskOverview | null, eventMessage: TaskAddedEventMessage): TaskOverview {
        const newProjectedEntity = existingProjectedEntity ?? { ...defaultTaskOverview};
        newProjectedEntity.taskId = eventMessage.aggregateId;
        newProjectedEntity.title = eventMessage.payload.title;
        newProjectedEntity.description = eventMessage.payload.description;
        newProjectedEntity.assigneeId = eventMessage.payload.assigneeId;
        newProjectedEntity.status = TaskStatusEnum.Open;

        return newProjectedEntity;
    }

    @OverwriteProtectionBody(false)
    applyTaskTaskTaskCompleted(existingProjectedEntity: TaskOverview | null, eventMessage: TaskCompletedEventMessage): TaskOverview {
        const newProjectedEntity = existingProjectedEntity ?? { ...defaultTaskOverview};
        newProjectedEntity.status = TaskStatusEnum.Completed;

        return newProjectedEntity;
    }
}
