import { describe, it, before, after } from "mocha";
import { expect } from "chai";
import { APIGatewayProxyResult, Event, parseToDateTime } from "@codebricks/typebricks";
import { MockHelper } from "tests/integration/utils/MockHelper";
import { IntegrationTestHelper, TExpectedEvent } from "tests/integration/utils/IntegrationTestHelper";
import { AddTaskApiRequest, AddTaskApiResponseBody } from "useCases/write/AddTask/infrastructure/AddTaskApi";
import { handler } from "useCases/write/AddTask/infrastructure/AddTaskApiHandler";
import { ExpectedTaskAddedEvent } from "tests/integration/utils/expected/events/ExpectedTaskAddedEvent";

const aggregateId: string = '9ae1fa49-33ad-4142-b921-28213a4f13cb';
const now: Date = new Date();
const request: AddTaskApiRequest = {
    title: '',
    description: '',
    assigneeId: '',
};
const expectedResponse: AddTaskApiResponseBody = {
    taskId: '',
};
const expectedEvents: TExpectedEvent[] = [
    ExpectedTaskAddedEvent.event({}),
];

describe('POST add-task',
    /** @overwrite-protection-body false */
    async function() {
        before(async function() {
            MockHelper.mockSQSClient();
            MockHelper.stubUuidGenerator(aggregateId);
            MockHelper.stubClock(now);
            await IntegrationTestHelper.resetDB();
        });

        after(function() {
            MockHelper.restore();
        });

        it('produces TaskAddedEvent', async function() {
            const result: APIGatewayProxyResult = await handler(
                IntegrationTestHelper.toApiGatewayEvent(request)
            );
            expect(result.statusCode).equal(200);
            expect(JSON.parse(result.body, parseToDateTime)?.data).to.deep.equal(expectedResponse);
            await IntegrationTestHelper.expectEventsOnStream(expectedEvents);
        });
    });

