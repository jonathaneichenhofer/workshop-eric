import { describe, it, before, after } from "mocha";
import { expect } from "chai";
import { APIGatewayProxyResult, Event, parseToDateTime } from "@codebricks/typebricks";
import { MockHelper } from "tests/integration/utils/MockHelper";
import { IntegrationTestHelper, TExpectedEvent } from "tests/integration/utils/IntegrationTestHelper";
import { CompleteTaskApiRequest } from "useCases/write/CompleteTask/infrastructure/CompleteTaskApi";
import { handler } from "useCases/write/CompleteTask/infrastructure/CompleteTaskApiHandler";
import { GivenTaskAddedEvent } from "tests/integration/utils/given/events/GivenTaskAddedEvent";
import { ExpectedTaskCompletedEvent } from "tests/integration/utils/expected/events/ExpectedTaskCompletedEvent";

const aggregateId: string = 'a4999ffa-5a3d-4391-b025-2071f7eca5ed';
const now: Date = new Date();
const givenTaskEvents: Event<any>[] = [
    GivenTaskAddedEvent.event({
        aggregateId: aggregateId,
        aggregateVersion: 1,
    }),
];
const request: CompleteTaskApiRequest = {
    taskId: '',
};
const expectedEvents: TExpectedEvent[] = [
    ExpectedTaskCompletedEvent.event({}),
];

describe('POST complete-task',
    /** @overwrite-protection-body false */
    async function() {
        before(async function() {
            MockHelper.mockSQSClient();
            MockHelper.stubClock(now);
            await IntegrationTestHelper.resetDB();
            await IntegrationTestHelper.givenTaskAggregate(givenTaskEvents);
        });

        after(function() {
            MockHelper.restore();
        });

        it('produces TaskCompletedEvent', async function() {
            const result: APIGatewayProxyResult = await handler(
                IntegrationTestHelper.toApiGatewayEvent(request)
            );
            expect(result.statusCode).equal(204);
            await IntegrationTestHelper.expectEventsOnStream(expectedEvents, givenTaskEvents);
        });
    });

