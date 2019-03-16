import Graphics = PIXI.Graphics;
import Container = PIXI.Container;
import {BaseView} from "../../../common/components/BaseView";
import {EventType} from "../../../common/type/EventType";
import {SpriteView} from "../../../common/components/SpriteView";

export class ReelView extends SpriteView {
    protected readonly BASE_WIDTH: number = 400;
    protected readonly BASE_HEIGHT: number = 630;

    protected background: Graphics;

    protected addListeners(): void {
        super.addListeners();
        this.addListener(EventType.ON_RENDER, this.onRender.bind(this));
        this.addListener(EventType.ON_RESIZE, this.onResize.bind(this));
    }

    protected setupChildren(parent: Container) {
        super.setupChildren(parent);
        this.background = new Graphics().beginFill(0x7FD5FF).drawRect(0, 0, 1, 1).endFill();
        this.background.visible = true;
        this.background.width = this.BASE_WIDTH;
        this.background.height = this.BASE_HEIGHT;
        this.view().addChild(this.background);
        this.onResize();
    }


    private onRender(): void {


    }

    private onResize(): void {
        this.view().x = this.view().parent.width * 0.35 / this.view().parent.scale.x;
        this.view().y = this.view().parent.height * 0.05 / this.view().parent.scale.y;
    }
}