import Container = PIXI.Container;
import Point = PIXI.Point;
import Graphics = PIXI.Graphics;
import {BaseView} from "../../common/components/BaseView";
import {EventType} from "../../common/type/EventType";

export class MainScreenView extends BaseView {
    protected _ball: Graphics;
    protected _delta: Point = new Point(2, 2);

    protected addListeners(): void {
        super.addListeners();
        this.addListener(EventType.START_GAME, this.onStartGame.bind(this));
        this.addListener(EventType.ON_RENDER, this.onRender.bind(this));
    }

    setupChildren(parent: Container) {
        super.setupChildren(parent);
        this._ball = new Graphics().beginFill(0xff3300).drawCircle(0, 0, 30).endFill();
        this._ball.visible = false;
        this.view.addChild(this._ball);
    }

    private onStartGame() {
        this._delta = new Point(Math.round(Math.random() * 3) + 1, Math.round(Math.random() * 3) + 1);
        this._ball.visible = true;
    }

    private onRender() {
        if (this._ball.x > this.data.sizeData.gameWidth || this._ball.x < 0) {
            this._delta.x *= -1;
        }

        if (this._ball.y > this.data.sizeData.gameHeight || this._ball.y < 0) {
            this._delta.y *= -1;
        }

        this._ball.x += this._delta.x;
        this._ball.y += this._delta.y;


    }
}