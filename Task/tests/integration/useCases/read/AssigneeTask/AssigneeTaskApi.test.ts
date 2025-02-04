import { describe, it, before, after } from "mocha";
import { expect } from "chai";
import { APIGatewayProxyResult, parseToDateTime } from "@codebricks/typebricks";
import { MockHelper } from "tests/integration/utils/MockHelper";
import { IntegrationTestHelper } from "tests/integration/utils/IntegrationTestHelper";
import { AssigneeTaskApiRequest } from "useCases/read/AssigneeTask/infrastructure/AssigneeTaskApi";
import { handler } from "useCases/read/AssigneeTask/infrastructure/AssigneeTaskApiHandler";
import { defaultTaskOverview, TaskOverview } from "shared/application/readmodels/TaskOverview";
import { GivenTaskOverview } from "tests/integration/utils/given/readmodels/GivenTaskOverview";

const givenTaskOverview: TaskOverview[] = [
    GivenTaskOverview.readModel({}),
];
const request: AssigneeTaskApiRequest = {
    assigneeId: '',
};
const expectedResponse: TaskOverview[] = [
    givenTaskOverview[0],
];

describe('GET assignee-task',
    /** @overwrite-protection-body false */
    async function() {
        before(async function() {
            await IntegrationTestHelper.resetDB();
            await IntegrationTestHelper.givenTaskOverviews(givenTaskOverview);
        });

        after(function() {
            MockHelper.restore();
        });

        it('returns response', async function() {
            const result: APIGatewayProxyResult = await handler(
                IntegrationTestHelper.toQueryApiGatewayEvent(request)
            );
            expect(result.statusCode).equal(200);
            expect(JSON.parse(result.body, parseToDateTime)?.data).to.deep.equal(expectedResponse);
        });
    });

