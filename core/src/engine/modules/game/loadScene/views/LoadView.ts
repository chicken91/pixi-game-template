import { Linear, TimelineMax } from 'gsap';
import { ContainerView } from "../../../../../components/views/ContainerView";
import { CoreEvents } from "../../../CoreEvents";

export class LoadView extends ContainerView {

    onAdded(): void {
        super.onAdded();
        this.addEventListener(CoreEvents.LOAD_SCENE_CLOSE, this.onHideLoadScene);
    }

    protected onHideLoadScene(hideLoadSceneCallback: Function): void {
        new TimelineMax()
            .to(this, 1, {}, 0)
            .to(this, 0.35, {alpha: 0, ease: Linear.easeIn}, 1)
            .call(this.removeFromStage.bind(this), [], {}, 1.35)
            .call(hideLoadSceneCallback(), [], {}, 1.35);
    }

    protected removeFromStage(): void {
        this.dispatch(CoreEvents.REMOVE_SCENE, `loadScene`);
    }
}