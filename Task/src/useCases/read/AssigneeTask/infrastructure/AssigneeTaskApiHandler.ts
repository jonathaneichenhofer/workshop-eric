import { APIGatewayProxyEvent, APIGatewayProxyResult } from "@codebricks/typebricks";
import { AssigneeTaskApi } from "./AssigneeTaskApi";
import { AssigneeTaskApiRequest } from "./AssigneeTaskApi";
import { initDataSource, destroyDataSource } from "shared/infrastructure/persistence/AppDataSource";

export async function handler(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    try {
        await initDataSource();
        const assigneeTaskApi: AssigneeTaskApi = new AssigneeTaskApi();
        const request: AssigneeTaskApiRequest = {
            assigneeId: event.queryStringParameters?.assigneeId as string,
        };
        return await assigneeTaskApi.handle(request) as unknown as Promise<APIGatewayProxyResult>;
    } catch (error: any) {
        console.log(error);
        if (error instanceof SyntaxError && error.message.match(/Unexpected.token.*JSON.*/i)) {
            return Promise.resolve({
                statusCode: 400,
                body: '{ "error": "bad request: invalid json"}',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': true
                }
            }) as Promise<APIGatewayProxyResult>;
        } else {
            return Promise.resolve({
                statusCode: 500,
                body: '{ "error": "Internal Server Error"}',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': true
                }
            }) as Promise<APIGatewayProxyResult>;
        }
    } finally {
        await destroyDataSource();
    }
}
