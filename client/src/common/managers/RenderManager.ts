import {EventDispatcher} from "../dispatcher/EventDispatcher";
import {EventType} from "../type/EventType";
import SystemRenderer = PIXI.SystemRenderer;

export class RenderManager {
    private _dispatcher: EventDispatcher;
    private _renderer: SystemRenderer;

    constructor(renderer: SystemRenderer, dispatcher: EventDispatcher) {
        this._dispatcher = dispatcher;
        this._renderer = renderer;
        this.initCanvas();
        this.initResizeListener();
        PIXI.ticker.shared.add(this.onRender.bind(this), this);
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

    private initResizeListener() {
        window.addEventListener("resize", this.onResize.bind(this));
    }

    private onResize() {
        this._renderer.resize(window.innerWidth, window.innerHeight);
        this._dispatcher.dispatch(EventType.ON_RESIZE, this._renderer.screen);
    }

    private onRender() {
        this._dispatcher.dispatch(EventType.ON_RENDER);
    }


    get canvas(): HTMLCanvasElement {
        return this._renderer.view;
    }
}