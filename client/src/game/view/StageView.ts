import Container = PIXI.Container;
import {BaseView} from "../../common/components/BaseView";
import {EventType} from "../../common/type/EventType";
import {MainView} from "./MainView";
import {InteractionView} from "./reel/InteractionView";
import Graphics = PIXI.Graphics;
import {SizeData} from "../data/size/SizeData";

export class StageView extends BaseView {
    protected background: Graphics;

    protected addListeners(): void {
        super.addListeners();
        this.addListener(EventType.ON_RESIZE, this.onResize.bind(this));
    }

    protected setupChildren(parent: Container) {
        super.setupChildren(parent);
        // this.background = new Graphics().beginFill(0xB3B3B3).drawRect(0, 0, 1, 1).endFill();
        // this.background.visible = true;
        // this.view.addChild(this.background);

        //this.view.width = this.data.size.screenSize.x;
        //this.view.height = this.data.size.screenSize.y;

        //this.view.pivot.x = 0.5;
        //this.view.pivot.y = 0.5;

        this.addChild(new MainView().setup(parent));
        //this.addChild(new InteractionView().setup(parent));
        this.onResize();
    }

    private onResize() {
        // if (this.data.size.screenSize.x > this.data.size.screenSize.y) {
        //     this.view.width = Math.round(Math.min(this.data.size.screenSize.y * this.data.size.gameRatio, this.data.size.screenSize.x));
        //     this.view.height = Math.round(Math.min(this.view.width / this.data.size.gameRatio, this.data.size.screenSize.y));
        // } else {
        //     this.view.height = Math.round(Math.min(this.data.size.screenSize.x / this.data.size.gameRatio, this.data.size.screenSize.y));
        //     this.view.width = Math.round(this.view.height * this.data.size.gameRatio);
        // }
        //
        //
        // this.view.x = this.data.size.screenSize.x / 2;
        // this.view.y = this.data.size.screenSize.y / 2;

        let scale = Math.min(window.innerWidth / SizeData.GAME_WIDTH, window.innerHeight / SizeData.GAME_HEIGHT);
        //this.view.scale.set(scale, scale);
        //this.background.width = this.data.size.screenSize.x;
        //this.background.height = this.data.size.screenSize.y;

    }
}