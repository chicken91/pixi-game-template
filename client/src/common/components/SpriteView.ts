import {BaseView} from "./BaseView";
import Container = PIXI.Container;
import BaseRenderTexture = PIXI.BaseRenderTexture;
import RenderTexture = PIXI.RenderTexture;
import Sprite = PIXI.Sprite;

export abstract class SpriteView extends BaseView {
    protected readonly BASE_WIDTH: number = 1;
    protected readonly BASE_HEIGHT: number = 1;
    protected _view: Sprite;

    public setup(parent?: Container): BaseView {
        this._view = new Sprite(new RenderTexture(new BaseRenderTexture(this.BASE_WIDTH, this.BASE_HEIGHT, PIXI.SCALE_MODES.LINEAR, 1)));
        return super.setup(parent);
    }

    public view(): Sprite {
        return <Sprite>super.view();
    }
}