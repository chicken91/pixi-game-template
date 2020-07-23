import { Action } from "../../../../core/components/actions/Action";
import { CoreEvents } from "../../../../core/engine/modules/CoreEvents";
import { TemplateEvents } from "../../TemplateEvents";

export class TapToStartAction extends Action {

    protected onExecute(): void {
        this.addListener(CoreEvents.ON_TOUCH_ANY_WHERE, this.onTouchAnyWhere);
    }

    protected onTouchAnyWhere(): void {
        this.dispatcher.dispatch(TemplateEvents.START_GAME);
        this.onFinish();
    }
}