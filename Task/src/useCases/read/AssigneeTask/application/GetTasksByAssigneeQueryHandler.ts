import { OverwriteProtectionBody } from "@codebricks/typebricks";
import { TaskOverview } from "shared/application/readmodels/TaskOverview";
import { TaskOverviewRepository } from "../infrastructure/TaskOverviewRepository";
import { GetTasksByAssigneeQuery } from "./GetTasksByAssigneeQuery";

export class GetTasksByAssigneeQueryHandler {
    constructor(readonly repository: TaskOverviewRepository = new TaskOverviewRepository()) {
    }

    @OverwriteProtectionBody(false)
    async handle(query: GetTasksByAssigneeQuery): Promise<TaskOverview[]> {
        const result: TaskOverview[] = await this.repository.getTasksByAssignee(
            query.properties.assigneeId,
        );
        return result;
    }
}
