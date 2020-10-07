import { Action } from "../../../../components/actions/Action";
import { CoreEvents } from "../../CoreEvents";

export class ShowLoadSceneAction extends Action {

    protected onExecute(): void {
        this.dispatcher.dispatch(CoreEvents.ADD_SCENE, `loadScene`);
        setTimeout(() => this.onFinish(), 450);
    }
}