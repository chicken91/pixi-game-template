import { Action } from "../../../../components/actions/Action";
import { CoreEvents } from "../../CoreEvents";

export class HideLoadSceneAction extends Action {
    protected onExecute(): void {
        this.dispatcher.dispatch(CoreEvents.LOAD_SCENE_CLOSE, this.onFinish.bind(this));
    }
}