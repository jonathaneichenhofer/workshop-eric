import { ValidationError, NotFoundError, OverwriteProtectionBody } from "@codebricks/typebricks";
import { GetTasksByAssigneeQuery } from "../application/GetTasksByAssigneeQuery";
import { GetTasksByAssigneeQueryHandler } from "../application/GetTasksByAssigneeQueryHandler";
import { TaskOverview } from "shared/application/readmodels/TaskOverview";

export interface AssigneeTaskApiRequest {
    assigneeId: string;
}

export interface AssigneeTaskApiResponse {
    statusCode: number;
    body: string;
    headers: any;
}

export class AssigneeTaskApi {
    constructor(readonly queryHandler: GetTasksByAssigneeQueryHandler = new GetTasksByAssigneeQueryHandler()) {
    }

    @OverwriteProtectionBody(false)
    async handle(request: AssigneeTaskApiRequest): Promise<AssigneeTaskApiResponse> {
        const headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true
        };
        try {
            const query: GetTasksByAssigneeQuery = new GetTasksByAssigneeQuery({
                assigneeId: request.assigneeId,
            });
            const result: TaskOverview[] = await this.queryHandler.handle(query);
            return {
                statusCode: 200,
                body: JSON.stringify({ data: result }),
                headers: headers
            };
        } catch (error) {
            console.log(error);
            if (error instanceof ValidationError) {
                return {
                    statusCode: 400,
                    body: JSON.stringify({ error: error.message }),
                    headers: headers
                };
            } else if (error instanceof SyntaxError && error.message.match(/Unexpected.token.*JSON.*/i)) {
                return {
                    statusCode: 400,
                    body: '{ "error": "bad request: invalid json"}',
                    headers: headers
                };
            }

            return {
                statusCode: 500,
                body: '{ "error": "Internal Server Error"}',
                headers: headers
            };
        }
    }
}
