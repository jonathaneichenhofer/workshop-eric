import { describe, it, beforeEach, after } from "mocha";
import { expect } from "chai";
import { MockHelper } from "tests/integration/utils/MockHelper";
import { IntegrationTestHelper } from "tests/integration/utils/IntegrationTestHelper";
import { TaskCompletedEventMessage } from "shared/application/inboundEvents/TaskCompletedEventMessage";
import { GivenTaskCompletedEventMessage } from "tests/integration/utils/given/inboundEvents/GivenTaskCompletedEventMessage";
import { defaultTaskOverview, TaskOverview } from "shared/application/readmodels/TaskOverview";
import { GivenTaskOverview } from "tests/integration/utils/given/readmodels/GivenTaskOverview";

const givenTaskOverview: TaskOverview[] = [
    GivenTaskOverview.readModel({}),
];
const projectedEvent: TaskCompletedEventMessage = GivenTaskCompletedEventMessage.inboundEvent({
    streamName: 'Task.Task',
    no: 1,
    aggregateId: '',
});
const expectedTaskOverview: TaskOverview[] = [
    {
        ...givenTaskOverview[0],
        status: TaskStatusEnum.Completed,
    },
];

describe('Projecting TaskCompleted',
    /** @overwrite-protection-body false */
    async function() {
        beforeEach(async function() {
            MockHelper.mockSQSClient();
            await IntegrationTestHelper.resetDB();
        });

        after(function() {
            MockHelper.restore();
        });

        it('updates TaskOverview read model.', async function() {
            await IntegrationTestHelper.givenTaskOverviews(givenTaskOverview);
            await IntegrationTestHelper.whenProjectingTaskOverview(projectedEvent);
            await IntegrationTestHelper.thenExpectTaskOverview(expectedTaskOverview);
        });
    });

