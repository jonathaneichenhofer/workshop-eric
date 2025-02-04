import { describe, it, beforeEach, after } from "mocha";
import { expect } from "chai";
import { MockHelper } from "tests/integration/utils/MockHelper";
import { IntegrationTestHelper } from "tests/integration/utils/IntegrationTestHelper";
import { TaskAddedEventMessage } from "shared/application/inboundEvents/TaskAddedEventMessage";
import { GivenTaskAddedEventMessage } from "tests/integration/utils/given/inboundEvents/GivenTaskAddedEventMessage";
import { defaultTaskOverview, TaskOverview } from "shared/application/readmodels/TaskOverview";
import { GivenTaskOverview } from "tests/integration/utils/given/readmodels/GivenTaskOverview";

const givenTaskOverview: TaskOverview[] = [
    GivenTaskOverview.readModel({}),
];
const projectedEvent: TaskAddedEventMessage = GivenTaskAddedEventMessage.inboundEvent({
    streamName: 'Task.Task',
    no: 1,
    aggregateId: '',
});
const expectedCreatedTaskOverview: TaskOverview[] = [
    {
        ...defaultTaskOverview,
        taskId: ,
        title: ,
        description: ,
        assigneeId: ,
        status: TaskStatusEnum.Open,
    },
];
const expectedUpdatedTaskOverview: TaskOverview[] = [
    {
        ...givenTaskOverview[0],
        taskId: ,
        title: ,
        description: ,
        assigneeId: ,
        status: TaskStatusEnum.Open,
    },
];

describe('Projecting TaskAdded',
    /** @overwrite-protection-body false */
    async function() {
        beforeEach(async function() {
            MockHelper.mockSQSClient();
            await IntegrationTestHelper.resetDB();
        });

        after(function() {
            MockHelper.restore();
        });

        it('creates TaskOverview read model.', async function() {
            await IntegrationTestHelper.whenProjectingTaskOverview(projectedEvent);
            await IntegrationTestHelper.thenExpectTaskOverview(expectedCreatedTaskOverview);
        });

        it('updates TaskOverview read model.', async function() {
            await IntegrationTestHelper.givenTaskOverviews(givenTaskOverview);
            await IntegrationTestHelper.whenProjectingTaskOverview(projectedEvent);
            await IntegrationTestHelper.thenExpectTaskOverview(expectedUpdatedTaskOverview);
        });
    });

