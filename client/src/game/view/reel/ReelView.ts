import {BaseView} from "../../../common/components/BaseView";
import {EventType} from "../../../common/type/EventType";
import Graphics = PIXI.Graphics;
import Container = PIXI.Container;

export class ReelView extends BaseView {
    protected background: Graphics;

    protected addListeners(): void {
        super.addListeners();
        this.addListener(EventType.ON_RENDER, this.onRender.bind(this));
        this.addListener(EventType.START_GAME, this.onStartGame.bind(this));
    }

    setupChildren(parent: Container) {
        super.setupChildren(parent);

        this.background = new Graphics().beginFill(0xF0F017).drawRect(0, 0, 100, 100).endFill();
        this.background.visible = true;
        this.view.addChild(this.background);
    }

    private onStartGame() {


    }

    private onRender() {


    }
}