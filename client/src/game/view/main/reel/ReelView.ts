import Graphics = PIXI.Graphics;
import Container = PIXI.Container;
import {EventType} from "../../../../common/type/EventType";
import {SpriteView} from "../../../../common/components/SpriteView";
import {Resources} from "../../../../common/type/Resources";
import {ReelWidget} from "./widgets/ReelWidget";

export class ReelView extends SpriteView {
    protected readonly BASE_WIDTH: number = 200;
    protected readonly BASE_HEIGHT: number = 600;

    protected background: Graphics;
    protected reelWidget: ReelWidget;

    protected addListeners(): void {
        super.addListeners();
        this.addListener(EventType.ON_RENDER, this.onRender.bind(this));
        this.addListener(EventType.ON_RESIZE, this.onResize.bind(this));
    }

    protected setupChildren(parent: Container) {
        super.setupChildren(parent);
        this.background = new Graphics().beginFill(0x7FD5FF).drawRect(0, 0, 1, 1).endFill();
        this.background.width = this.BASE_WIDTH;
        this.background.height = this.BASE_HEIGHT;
        this.view().addChild(this.background);

        this.reelWidget = new ReelWidget(Resources.IMAGES);
        this.reelWidget.initWidget();
        this.reelWidget.x = (this.BASE_WIDTH - this.reelWidget.width) / 2;
        this.view().addChild(this.reelWidget);

        this.onResize();
    }


    private onRender(): void {
        this.reelWidget.onRender(this.data.reel);
    }

    private onResize(): void {
        this.view().x = this.view().parent.width * 0.45 / this.view().parent.scale.x;
        this.view().y = this.view().parent.height * 0.07 / this.view().parent.scale.y;
    }
}