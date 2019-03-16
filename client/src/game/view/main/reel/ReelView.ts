import Graphics = PIXI.Graphics;
import Container = PIXI.Container;
import {EventType} from "../../../../common/type/EventType";
import {SpriteView} from "../../../../common/components/SpriteView";
import {ReelWidget} from "./widgets/ReelWidget";
import {ReelState} from "../../../../common/type/ReelState";
import {Resources} from '../../../constants';
import {ParticlesWidget} from "./widgets/ParticlesWidget";

export class ReelView extends SpriteView {
    protected readonly BASE_WIDTH: number = 200;
    protected readonly BASE_HEIGHT: number = 600;

    protected background: Graphics;
    protected reelWidget: ReelWidget;
    protected particlesWidget: ParticlesWidget;

    protected addListeners(): void {
        super.addListeners();
        this.addListener(EventType.ON_RENDER, this.onRender.bind(this));
        this.addListener(EventType.ON_RESIZE, this.onResize.bind(this));
        this.addListener(EventType.START_REEL_SPIN, this.onStartReelSpin.bind(this));
        this.addListener(EventType.STOP_REEL_SPIN, this.onStopReelSpin.bind(this));
    }

    protected setupChildren(parent: Container) {
        super.setupChildren(parent);
        this.particlesWidget = new ParticlesWidget();
        this.particlesWidget.initWidget();
        this.particlesWidget.x = this.BASE_WIDTH / 2;
        this.particlesWidget.y = this.BASE_HEIGHT / 2;
        this.view().addChild(this.particlesWidget);

        this.background = new Graphics().beginFill(0x7FD5FF).drawRect(0, 0, 1, 1).endFill();
        this.background.width = this.BASE_WIDTH;
        this.background.height = this.BASE_HEIGHT;
        this.view().addChild(this.background);

        this.reelWidget = new ReelWidget(Resources.images);
        this.reelWidget.initWidget(this.onReelStop.bind(this));
        this.reelWidget.x = (this.BASE_WIDTH - this.reelWidget.width) / 2;
        this.view().addChild(this.reelWidget);

        this.onResize();
    }


    private onRender(): void {
        this.reelWidget.onRender(this.data.reel.state);
        this.particlesWidget.onRender();
    }

    private onResize(): void {
        this.view().x = this.view().parent.width * 0.45 / this.view().parent.scale.x;
        this.view().y = this.view().parent.height * 0.07 / this.view().parent.scale.y;
    }

    private onStartReelSpin(): void {
        this.data.reel.state = ReelState.SPINNING;
        this.particlesWidget.startAnimation();
    }

    private onStopReelSpin(): void {
        this.data.reel.state = ReelState.STOPPING;
        this.particlesWidget.stopAnimation();
    }

    private onReelStop(): void {
        this.data.reel.state = ReelState.IDLE;
        this.dispatcher.dispatch(EventType.REEL_STOPPED);
    }
}