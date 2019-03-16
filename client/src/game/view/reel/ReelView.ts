import Graphics = PIXI.Graphics;
import Container = PIXI.Container;
import {BaseView} from "../../../common/components/BaseView";
import {EventType} from "../../../common/type/EventType";

export class ReelView extends BaseView {
    protected background: Graphics;

    protected addListeners(): void {
        super.addListeners();
        this.addListener(EventType.ON_RENDER, this.onRender.bind(this));
        this.addListener(EventType.ON_RESIZE, this.onResize.bind(this));
    }

    protected setupChildren(parent: Container) {
        super.setupChildren(parent);
        this.background = new Graphics().beginFill(0xF0FF5B).drawRect(0, 0, 1, 1).endFill();
        this.background.visible = true;
        this.background.width = 100;
        this.background.height = 400;
        this.view().addChild(this.background);
        this.onResize();

    }


    private onRender(): void {


    }

    private onResize(): void {
        // if (this.data.size.screenSize.x > this.data.size.screenSize.y) {
        //     this.view.width = Math.round(Math.min(this.data.size.screenSize.y * this.data.size.gameRatio, this.data.size.screenSize.x));
        //     this.view.height = Math.round(Math.min(this.view.width / this.data.size.gameRatio, this.data.size.screenSize.y));
        // } else {
        //     this.view.height = Math.round(Math.min(this.data.size.screenSize.x / this.data.size.gameRatio, this.data.size.screenSize.y));
        //     this.view.width = Math.round(this.view.height * this.data.size.gameRatio);
        // }
        //
        // this.view.pivot.x = 0.5;
        // this.view.pivot.y = 0.5;
        //
        // this.view.x = this.data.size.screenSize.x / 2;
        // this.view.y = this.data.size.screenSize.y / 2;
    }
}