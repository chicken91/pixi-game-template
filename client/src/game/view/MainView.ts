import Container = PIXI.Container;
import {BaseView} from "../../common/components/BaseView";
import {EventType} from "../../common/type/EventType";
import {ReelView} from "./reel/ReelView";
import {InteractionView} from "./reel/InteractionView";

export class MainView extends BaseView {
    protected addListeners(): void {
        super.addListeners();
        this.addListener(EventType.ON_RESIZE, this.onResize.bind(this));
    }

    setupChildren(parent: Container) {
        super.setupChildren(parent);
        this.addChild(new ReelView().setup(parent));
        this.addChild(new InteractionView().setup(parent));
        this.onResize();
    }

    private onResize() {
        this.view.scale.set(this.data.size.scale);
    }
}