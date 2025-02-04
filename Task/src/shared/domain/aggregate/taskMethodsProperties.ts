import { TitleValueObject } from "shared/domain/valueObjects/TitleValueObject";
import { DescriptionValueObject } from "shared/domain/valueObjects/DescriptionValueObject";
import { AssigneeIdValueObject } from "shared/domain/valueObjects/AssigneeIdValueObject";

export interface AddTaskProperties {
    title: TitleValueObject;
    description: DescriptionValueObject;
    assigneeId: AssigneeIdValueObject;
}

export interface CompleteTaskProperties {
}
