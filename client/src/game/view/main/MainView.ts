import {EventType} from "../../../common/type/EventType";
import {ReelView} from "./reel/ReelView";
import {SpriteView} from "../../../common/components/SpriteView";
import Container = PIXI.Container;

export class MainView extends SpriteView {
    protected readonly BASE_WIDTH: number = 1320;
    protected readonly BASE_HEIGHT: number = 700;

    protected addListeners(): void {
        super.addListeners();
        this.addListener(EventType.ON_RENDER, this.onRender.bind(this));
        this.addListener(EventType.ON_RESIZE, this.onResize.bind(this));
        this.addListener(EventType.ON_CONTEXT_INIT, this.onStartGame.bind(this));
    }

    protected setupChildren(parent: Container) {
        super.setupChildren(parent);
        this.addChild(new ReelView().setup(parent));
        this.onResize();
    }

    private onStartGame(): void {


    }

    private onRender(): void {


    }

    private onResize(): void {
        let scale = Math.min(this.data.size.screenSize.x / this.BASE_WIDTH, this.data.size.screenSize.y / this.BASE_HEIGHT);
        this.view().scale.set(scale, scale);
        this.view().pivot.set(this.view().width / 2 / scale, this.view().height / 2 / scale);
        this.view().x = this.data.size.screenSize.x / 2;
        this.view().y = this.data.size.screenSize.y / 2;
    }

}