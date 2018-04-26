import Container = PIXI.Container;
import Text = PIXI.Text;
import {BaseView} from "../../common/components/BaseView";
import {EventType} from "../../common/type/EventType";
import {Global} from "../../common/global/Global";

export class MainScreenView extends BaseView {
    protected _text: Text;
    protected _delta: number = 1;

    protected addListeners(): void {
        super.addListeners();
        this.addListener(EventType.START_GAME, this.onStartGame.bind(this));
        this.addListener(EventType.ON_RENDER, this.onRender.bind(this));
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
        if (this._text.x >= Global.renderManager.canvas.width) {
            this._delta = -1;
        }

        if (this._text.x <= 0) {
            this._delta = 1;
        }
        this._text.x += this._delta;
    }
}