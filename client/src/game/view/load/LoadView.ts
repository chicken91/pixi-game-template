import {BaseView} from "../../../common/components/BaseView";
import {EventType} from "../../../common/type/EventType";
import Graphics = PIXI.Graphics;
import Container = PIXI.Container;
import Text = PIXI.Text;

export class LoadView extends BaseView {
    protected readonly BASE_WIDTH: number = 1320;
    protected readonly BASE_HEIGHT: number = 700;

    private background: Graphics;
    private loadingText: Text;

    protected addListeners(): void {
        super.addListeners();
        this.addListener(EventType.ON_RENDER, this.onRender.bind(this));
        this.addListener(EventType.ON_RESIZE, this.onResize.bind(this));
    }

    protected setupChildren(parent: Container) {
        super.setupChildren(parent);
        this.background = new Graphics().beginFill(0x000000).drawRect(0, 0, 1, 1).endFill();
        this.background.width = this.BASE_WIDTH;
        this.background.height = this.BASE_HEIGHT;
        this.view().addChild(this.background);

        this.loadingText = new Text("LOADING...");
        this.loadingText.style.fill = "#FFFFFF";
        this.loadingText.width = 600;
        this.loadingText.height = 100;

        this.view().addChild(this.loadingText);
        this.onResize();
    }

    private onRender(): void {


    }

    private onResize(): void {
        this.background.width = this.data.size.screenSize.x;
        this.background.height = this.data.size.screenSize.y;

        if (this.data.size.screenSize.x > this.data.size.screenSize.y) {
            this.loadingText.width = 0.8 * Math.round(Math.min(this.data.size.screenSize.y * 6, this.data.size.screenSize.x));
            this.loadingText.height = Math.round(Math.min(this.loadingText.width / 6, this.data.size.screenSize.y));
        } else {
            this.loadingText.height = 0.8 * Math.round(Math.min(this.data.size.screenSize.x / 6, this.data.size.screenSize.y));
            this.loadingText.width = Math.round(Math.min(this.loadingText.height * 6, this.data.size.screenSize.x));
        }
        this.loadingText.anchor.set(0.5, 0.5);
        this.loadingText.x = this.data.size.screenSize.x / 2;
        this.loadingText.y = this.data.size.screenSize.y / 2;
    }

}