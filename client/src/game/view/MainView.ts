import {BaseView} from "../../common/components/BaseView";
import {EventType} from "../../common/type/EventType";
import Graphics = PIXI.Graphics;
import Container = PIXI.Container;
import {SizeData} from "../data/size/SizeData";
import {ReelView} from "./reel/ReelView";
import Sprite = PIXI.Sprite;
import {Global} from "../../common/global/Global";
import BaseRenderTexture = PIXI.BaseRenderTexture;
import RenderTexture = PIXI.RenderTexture;
import {SpriteView} from "../../common/components/SpriteView";

export class MainView extends SpriteView {
    protected readonly BASE_WIDTH: number = 1320;
    protected readonly BASE_HEIGHT: number = 700;

    protected background: Graphics;

    protected addListeners(): void {
        super.addListeners();
        this.addListener(EventType.ON_RENDER, this.onRender.bind(this));
        this.addListener(EventType.ON_RESIZE, this.onResize.bind(this));
        this.addListener(EventType.START_GAME, this.onStartGame.bind(this));
    }

    protected setupChildren(parent: Container) {
        super.setupChildren(parent);
        //this.view().anchor.set(0.5, 0.5);

        this.background = new Graphics().beginFill(0x69ECFF).drawRect(0, 0, 1, 1).endFill();
        this.background.visible = true;
        this.background.width = this.view().width;
        this.background.height = this.view().height;

        this.view().addChild(this.background);

        this.addChild(new ReelView().setup(parent));

        this.onResize();

    }

    private onStartGame(): void {


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



        let scale = Math.min(window.innerWidth / this.BASE_WIDTH, window.innerHeight / this.BASE_HEIGHT);
        this.view().scale.set(scale, scale);

        //this.view().pivot.x = 0.5;
        //this.view().pivot.y = 0.5;

        //this.view().x = this.data.size.screenSize.x / 2;
        //this.view().y = this.data.size.screenSize.y / 2;
    }


}