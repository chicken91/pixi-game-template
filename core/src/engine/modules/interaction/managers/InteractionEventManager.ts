import { EventDispatcher } from "../../../../components/events/EventDispatcher";
import { bind, inject } from "../../../../injects/inject";
import { CoreEvents } from "../../CoreEvents";
import { isNullOrUndefined } from "util";
import { RenderModel } from "../../screen/model/RenderModel";
import { CreationPriority } from "../../../../injects/CreationPriority";
import InteractionManager = PIXI.InteractionManager;
import InteractionEvent = PIXI.InteractionEvent;

@bind({singleton: true, priority: CreationPriority.HIGH})
export class InteractionEventManager {
    protected dispatcher: EventDispatcher = inject(EventDispatcher);
    protected renderModel: RenderModel = inject(RenderModel);

    constructor() {
        const interactionManager: InteractionManager = this.renderModel.renderer.plugins.interaction;
        interactionManager.on("pointerdown", this.onTouchStart, this);
    }

    protected onTouchStart(event: InteractionEvent): void {
        if (isNullOrUndefined(event.currentTarget)) {
            this.dispatcher.dispatch(CoreEvents.ON_TOUCH_ANY_WHERE, event);
        }
    }
}