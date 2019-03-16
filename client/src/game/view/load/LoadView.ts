import {BaseView} from "../../../common/components/BaseView";
import {EventType} from "../../../common/type/EventType";
import {TextConstants, TimeConstants} from "../../constants";
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
        this.addListener(EventType.ON_RESIZE, this.onResize.bind(this));
        this.addListener(EventType.ON_INIT_MAIN_VIEW, this.onInitMainView.bind(this));
    }

    protected setupChildren(parent: Container) {
        super.setupChildren(parent);
        this.background = new Graphics().beginFill(0x000000).drawRect(0, 0, 1, 1).endFill();
        this.background.width = this.BASE_WIDTH;
        this.background.height = this.BASE_HEIGHT;
        this.view().addChild(this.background);

        this.loadingText = new Text(TextConstants.loadingProgress);
        this.loadingText.style.fill = "#FFFFFF";
        this.loadingText.width = 600;
        this.loadingText.height = 100;

        this.view().addChild(this.loadingText);
        this.onResize();
    }

    private onResize(): void {
        this.background.width = this.data.size.screenSize.x;
        this.background.height = this.data.size.screenSize.y;

        if (this.data.size.screenSize.x > this.data.size.screenSize.y) {
            this.loadingText.width = 0.4 * Math.round(Math.min(this.data.size.screenSize.y * 6, this.data.size.screenSize.x));
            this.loadingText.height = Math.round(Math.min(this.loadingText.width / 6, this.data.size.screenSize.y));
        } else {
            this.loadingText.height = 0.4 * Math.round(Math.min(this.data.size.screenSize.x / 6, this.data.size.screenSize.y));
            this.loadingText.width = Math.round(Math.min(this.loadingText.height * 6, this.data.size.screenSize.x));
        }
        this.loadingText.anchor.set(0.5, 0.5);
        this.loadingText.x = this.data.size.screenSize.x / 2;
        this.loadingText.y = this.data.size.screenSize.y / 2;
    }

    private onInitMainView(): void {
        setTimeout(this.hideLoadingView.bind(this), TimeConstants.loadingViewHideDelay);
    }

    private hideLoadingView(): void {
        this.view().visible = false
    }
}