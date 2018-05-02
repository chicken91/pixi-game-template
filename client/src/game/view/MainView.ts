import Container = PIXI.Container;
import {BaseView} from "../../common/components/BaseView";
import {EventType} from "../../common/type/EventType";
import {BallView} from "./ball/BallView";

export class MainView extends BaseView {
    protected addListeners(): void {
        super.addListeners();
        this.addListener(EventType.ON_RESIZE, this.onResize.bind(this));
    }

    setupChildren(parent: Container) {
        super.setupChildren(parent);
        this.addChild(new BallView(this.dispatcher, this.data).setup(parent));
        this.onResize();
    }

    private onResize() {
        this.view.scale.set(this.data.sizeData.scale);
    }
}