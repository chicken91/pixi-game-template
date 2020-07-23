import { EventDispatcher } from "../../../../components/events/EventDispatcher";
import { inject } from "../../../../injects/inject";
import { CoreEvents } from "../../CoreEvents";
import { CoreConstants } from "../../CoreConstants";
import { RenderModel } from "../model/RenderModel";
import Ticker = PIXI.Ticker;

export class RenderManager {
    protected dispatcher: EventDispatcher = inject(EventDispatcher);
    protected renderModel: RenderModel = inject(RenderModel);

    constructor() {
        this.renderModel.createApplication();
        this.initCanvas();
        this.renderModel.createFPSMeter();
        this.initFocusListeners();
        Ticker.shared.add(this.onRender, this);
    }

    protected initFocusListeners(): void {
        window.addEventListener('focus', (event) => {
            this.dispatcher.dispatch(CoreEvents.RECOVER_GAME_FOCUS);
        });

        window.addEventListener('blur', (event) => {
            this.dispatcher.dispatch(CoreEvents.LOSE_GAME_FOCUS);
        });
    }

    public resizeCanvas(width: number, heigth: number) {
        this.renderModel.renderer.resize(width, heigth);
        this.updateCanvasStyleDimension(width, heigth);
    }

    protected onRender() {
        this.dispatcher.dispatch(CoreEvents.ON_RENDER);
        this.renderModel.updateFPSMeter();
    }

    protected initCanvas() {
        Object.assign(this.renderModel.canvas.style, CoreConstants.styles.game);

        const gamePlayPanel = document.getElementById("game-div") as HTMLDivElement;
        gamePlayPanel.appendChild(this.renderModel.canvas);

        if (CoreConstants.deviceType.MOBILE) {
            var meta = document.createElement('meta');
            meta.name = "viewport";
            meta.content = "initial-scale=1,minimum-scale=1,maximum-scale=1,width=device-width,user-scalable=no";
            document.getElementsByTagName('head')[0].appendChild(meta);
        }

    }

    protected updateCanvasStyleDimension(width: number, heigth: number): void {
        this.renderModel.canvas.style.width = width.toString() + "px";
        this.renderModel.canvas.style.height = heigth.toString() + "px";
    }
}