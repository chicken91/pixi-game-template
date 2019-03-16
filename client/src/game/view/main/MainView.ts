import {EventType} from "../../../common/type/EventType";
import {ReelView} from "./reel/ReelView";
import {SpriteView} from "../../../common/components/SpriteView";
import {InteractionEvents} from "../../constants";
import Container = PIXI.Container;
import Graphics = PIXI.Graphics;

export class MainView extends SpriteView {
    protected readonly BASE_WIDTH: number = 1320;
    protected readonly BASE_HEIGHT: number = 700;
    protected readonly CURSOR_STYLE: string = 'pointer';
    protected spinButton: Graphics;

    protected addListeners(): void {
        super.addListeners();
        this.addListener(EventType.ON_RESIZE, this.onResize.bind(this));
        this.addListener(EventType.REEL_STOPPED, this.onReelStopped.bind(this));
        this.spinButton.on(InteractionEvents.click, this.onSpinButtonClick.bind(this));

    }

    protected setupChildren(parent: Container) {
        super.setupChildren(parent);
        this.addChild(new ReelView().setup(parent));
        this.setupSpinButton();
        this.onResize();
    }

    private onResize(): void {
        let scale = Math.min(this.data.size.screenSize.x / this.BASE_WIDTH, this.data.size.screenSize.y / this.BASE_HEIGHT);
        this.view().scale.set(scale, scale);
        this.view().pivot.set(this.view().width / 2 / scale, this.view().height / 2 / scale);
        this.view().x = this.data.size.screenSize.x / 2;
        this.view().y = this.data.size.screenSize.y / 2;
    }

    private onReelStopped(): void {
        this.setSpinButtonEnable(true);
    }

    private onSpinButtonClick(): void {
        this.setSpinButtonEnable(false);
        this.dispatcher.dispatch(EventType.START_REEL_SPIN);
    }

    private setupSpinButton(): void {
        this.spinButton = new Graphics().beginFill(0xFFFFFF).drawCircle(0, 0, 1).endFill();
        this.spinButton.width = this.BASE_WIDTH * 0.15;
        this.spinButton.height = this.BASE_WIDTH * 0.15;
        this.spinButton.x = this.BASE_WIDTH * 0.8;
        this.spinButton.y = this.BASE_HEIGHT * 0.5;
        this.setSpinButtonEnable(true);
        this.spinButton.cursor = this.CURSOR_STYLE;
        this.view().addChild(this.spinButton);
    }

    private setSpinButtonEnable(enable: boolean): void {
        this.spinButton.buttonMode = enable;
        this.spinButton.interactive = enable;
        this.spinButton.alpha = enable ? 1 : 0.5;
    }

}