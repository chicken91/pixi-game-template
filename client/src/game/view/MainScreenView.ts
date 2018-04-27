import Container = PIXI.Container;
import Text = PIXI.Text;
import {BaseView} from "../../common/components/BaseView";
import {EventType} from "../../common/type/EventType";
import {Global} from "../../common/global/Global";
import {log} from "util";
import Point = PIXI.Point;

export class MainScreenView extends BaseView {
    protected _text: Text;
    protected _textPosition: Point = new Point(0, 0);
    protected _delta: number = 2;

    protected addListeners(): void {
        super.addListeners();
        this.addListener(EventType.START_GAME, this.onStartGame.bind(this));
        this.addListener(EventType.ON_RENDER, this.onRender.bind(this));
        this.addListener(EventType.ON_RESIZE, this.onResize.bind(this));
    }

    setupChildren(parent: Container) {
        //super.setupChildren(parent);
        this._text = new Text('Hello World!', {fill: "#ffff61"});
        this._text.visible = false;
        this.view.addChild(this._text);

    }

    private onStartGame() {
        this._text.visible = true;
    }

    private onRender() {
        if (this._textPosition.x >= this.data.sizeData.gameWidth) {
            this._delta = -2;
        }

        if (this._textPosition.x <= 0) {
            this._delta = 2;
        }
        this._textPosition.x += this._delta;

        this.onResize();
    }

    private onResize() {
        this._text.x = this._textPosition.x * this.data.sizeData.screenFactor.x;
        this._text.y = this._textPosition.y * this.data.sizeData.screenFactor.y;
    }
}