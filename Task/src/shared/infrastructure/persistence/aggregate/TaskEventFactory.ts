import { OverwriteProtectionBody, EventFactory, parseToDateTime } from "@codebricks/typebricks";
import { TaskEventStreamEntity } from "shared/infrastructure/persistence/aggregate/TaskEventStreamEntity";
import { TaskAddedEvent, TaskAddedEventPayload } from "shared/domain/events/TaskAddedEvent";

export class TaskEventFactory extends EventFactory {
    readonly getEvent = {
        [TaskAddedEvent.eventName]: this.getTaskAddedEvent
    };

    @OverwriteProtectionBody(false)
    getTaskAddedEvent(storedEvent: TaskEventStreamEntity): TaskAddedEvent {
        const deserializedPayload: Partial<TaskAddedEventPayload> = JSON.parse(storedEvent.payload, parseToDateTime);
        return new TaskAddedEvent(
            {
                id: storedEvent.id,
                aggregateId: storedEvent.aggregateId,
                aggregateVersion: storedEvent.aggregateVersion,
                payload: {
                    title: deserializedPayload.title!,
                    description: deserializedPayload.description!,
                    assigneeId: deserializedPayload.assigneeId!,
                },
                occurredAt: new Date(storedEvent.occurredAt)
            }
        );
    }
}
