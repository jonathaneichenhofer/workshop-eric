import { TitleValueObject } from "shared/domain/valueObjects/TitleValueObject";
import { DescriptionValueObject } from "shared/domain/valueObjects/DescriptionValueObject";
import { AssigneeIdValueObject } from "shared/domain/valueObjects/AssigneeIdValueObject";

export class AddTaskCommand {
    constructor(readonly payload: AddTaskCommandPayload) {
    }
}

export interface AddTaskCommandPayload {
    title: TitleValueObject;
    description: DescriptionValueObject;
    assigneeId: AssigneeIdValueObject;
}
