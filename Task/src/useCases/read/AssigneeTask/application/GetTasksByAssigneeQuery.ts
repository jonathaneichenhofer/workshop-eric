import { isType } from "is-what";
import { validate } from "uuid";
import { OverwriteProtectionBody, ValidationError } from "@codebricks/typebricks";

export interface GetTasksByAssigneeQueryProperties {
    assigneeId: string;
}

export class GetTasksByAssigneeQuery {
    constructor(readonly properties: GetTasksByAssigneeQueryProperties) {
        this.validate();
    }

    @OverwriteProtectionBody(false)
    validate(): void {
        if (!validate(this.properties.assigneeId)) {
            throw new ValidationError('assigneeId is invalid');
        }
    }
}
