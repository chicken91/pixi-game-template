import { Action } from "../../../core/components/actions/Action";
import { TemplateEvents } from "../../TemplateEvents";
import { CoreEvents } from "../../../core/engine/modules/CoreEvents";

export class RestartMessageAction extends Action {

    protected onExecute(): void {
        this.addListener(TemplateEvents.CLICK_RESTART_BUTTON, this.onClickRestartButton);
    }

    protected onClickRestartButton(): void {
        this.dispatcher.dispatch(CoreEvents.REMOVE_SCENE, "gameScene");
        this.dispatcher.dispatch(CoreEvents.ADD_SCENE, "gameScene");
        this.onFinish();
    }
}