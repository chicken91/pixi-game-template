import { EventDispatcher } from "../../../../components/events/EventDispatcher";
import { inject } from "../../../../injects/inject";
import { CoreEvents } from "../../CoreEvents";

export class KeyboardManager {
    protected dispatcher: EventDispatcher = inject(EventDispatcher);

    constructor() {
        document.addEventListener('keydown', this.onKeyDown.bind(this), false);
    }

    protected onKeyDown(event: KeyboardEvent): void {
        if (event.code === 'Space') {
            this.dispatcher.dispatch(CoreEvents.ON_SPACE_KEY_PRESS);
        }
    }
}