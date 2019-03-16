import {EventDispatcher} from "../dispatcher/EventDispatcher";
import {EventType} from "../type/EventType";
import {Global} from "../global/Global";
import SystemRenderer = PIXI.SystemRenderer;

export class RenderManager {
    private _dispatcher: EventDispatcher;
    private _renderer: SystemRenderer;
    private fpsMeter: FPSMeter;

    constructor(renderer: SystemRenderer) {
        this._dispatcher = Global.dispatcher;
        this._renderer = renderer;
        this.initCanvas();
        this.initFPSMeter();
        PIXI.ticker.shared.add(this.onRender.bind(this), this);
    }

    public resizeCanvas(width: number, height: number) {
        let canvasStyle = this._renderer.view.style;
        canvasStyle.left = (window.innerWidth / 2 - width / 2) + "px";
        canvasStyle.right = (window.innerWidth / 2 + width / 2) + "px";
        canvasStyle.top = (window.innerHeight / 2 - height / 2) + "px";
        canvasStyle.bottom = (window.innerHeight / 2 + height / 2) + "px";

        this._renderer.resize(width, height);
    }

    private initCanvas() {
        Object.assign(this._renderer.view.style, {
            position: "fixed",
            top: 0,
            left: 0,
            background: "#bde6eb"
        });
        document.body.appendChild(this._renderer.view);
    }

    private initFPSMeter() {
        this.fpsMeter = new FPSMeter(document.body, {
            graph: 1,
            history: 20,
            left: "10px",
            position: "fixed",
            maxFps: 1000,
            theme: "light"
        });
    }

    private onRender() {
        this.fpsMeter.tick();
        this._dispatcher.dispatch(EventType.ON_RENDER);
    }


    get canvas(): HTMLCanvasElement {
        return this._renderer.view;
    }
}