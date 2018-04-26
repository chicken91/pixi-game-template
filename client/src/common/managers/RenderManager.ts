import {EventDispatcher} from "../dispatcher/EventDispatcher";
import {EventType} from "../type/EventType";

export class RenderManager {
    private _dispatcher: EventDispatcher;
    private _canvas: HTMLCanvasElement;

    constructor(canvas: HTMLCanvasElement, dispatcher: EventDispatcher) {
        this._dispatcher = dispatcher;
        this._canvas = canvas;
        this.initCanvas();
        PIXI.ticker.shared.add(this.onRender.bind(this), this);
    }

    private initCanvas() {
        Object.assign(this._canvas.style, {
            position: "fixed",
            top: 0,
            left: 0,
            background: "#bde6eb"
        });
        document.body.appendChild(this._canvas);
    }

    private onRender() {
        this._dispatcher.dispatch(EventType.ON_RENDER);
    }

    get canvas(): HTMLCanvasElement {
        return this._canvas;
    }
}