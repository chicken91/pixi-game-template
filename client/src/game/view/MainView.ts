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
import PI_2 = PIXI.PI_2;

export class MainView extends SpriteView {
    protected readonly BASE_WIDTH: number = 1320;
    protected readonly BASE_HEIGHT: number = 700;

    protected addListeners(): void {
        super.addListeners();
        this.addListener(EventType.ON_RENDER, this.onRender.bind(this));
        this.addListener(EventType.ON_RESIZE, this.onResize.bind(this));
        this.addListener(EventType.START_GAME, this.onStartGame.bind(this));
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