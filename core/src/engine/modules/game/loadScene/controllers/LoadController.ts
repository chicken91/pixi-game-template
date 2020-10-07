import { LoadView } from "../views/LoadView";
import { AbstractController } from "../../../../../components/controllers/AbstractController";
import { CoreEvents } from "../../../CoreEvents";

export class LoadController extends AbstractController {
    protected view!: LoadView;

    protected initialize(): void {
        this.addListener(CoreEvents.LOAD_SCENE_CLOSE, this.onHideLoadScene.bind(this));
    }

    protected onHideLoadScene(onHideCallback: Function): void {
        this.view.hide()
            .then(this.removeFromStage.bind(this, onHideCallback));
    }

    protected removeFromStage(onHideCallback: Function): void {
        this.dispatch(CoreEvents.REMOVE_SCENE, `loadScene`);
        if (onHideCallback) {
            onHideCallback();
        }
    }
}