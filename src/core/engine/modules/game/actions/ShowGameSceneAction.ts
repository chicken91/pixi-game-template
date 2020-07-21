import { Action } from "../../../../components/actions/Action";
import { CoreEvents } from "../../CoreEvents";
import { CoreConstants } from '../../CoreConstants';

export class ShowGameSceneAction extends Action {

    protected onExecute(): void {
        this.initSceneData();
        this.addScene();
        this.updateSceneComponents();
        this.onFinish();
    }

    protected initSceneData(): void {
        this.dispatcher.dispatch(CoreEvents.INIT_SCENE_DATA);
    }

    protected addScene(): void {
        this.dispatcher.dispatch(CoreEvents.ADD_SCENE, CoreConstants.scenes.gameScene);
    }

    protected updateSceneComponents(): void {

    }
}