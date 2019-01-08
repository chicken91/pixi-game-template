import {BaseView} from "../../../common/components/BaseView";
import {EventType} from "../../../common/type/EventType";
import Graphics = PIXI.Graphics;
import Container = PIXI.Container;

export class BallView extends BaseView {
    protected _ball: Graphics;
    protected wild: Graphics;

    protected addListeners(): void {
        super.addListeners();
        this.addListener(EventType.ON_RENDER, this.onRender.bind(this));
        this.addListener(EventType.START_GAME, this.onStartGame.bind(this));
    }

    setupChildren(parent: Container) {
        super.setupChildren(parent);
        this._ball = new Graphics().beginFill(0xff3300).drawCircle(0, 0, this.data.ball.radius).endFill();
        this._ball.visible = false;
        this.view.addChild(this._ball);

        this.wild = new Graphics().beginFill(0xff3300).drawCircle(0, 0, this.data.ball.radius).endFill();
        this._ball.visible = false;
        this.view.addChild(this._ball);
    }

    private onStartGame() {
        this.data.ball.delta.set(Math.round(Math.random() * 3) + 1, Math.round(Math.random() * 3) + 1);
        this._ball.visible = true;
    }

    private onRender() {
        this.data.ball.updatePosition();

        this._ball.x = this.data.ball.position.x;
        this._ball.y = this.data.ball.position.y;
    }
}