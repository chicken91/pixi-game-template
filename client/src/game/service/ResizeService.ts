import {Unit} from "../../common/components/Unit";
import {EventDispatcher} from "../../common/dispatcher/EventDispatcher";
import {EventType} from "../../common/type/EventType";
import {Global} from "../../common/global/Global";
import {GameData} from "../data/GameData";
import Container = PIXI.Container;

export class ResizeService extends Unit {
    private _stage: Container;

    constructor(dispatcher: EventDispatcher, data: GameData) {
        super(dispatcher, data);
        this.initResizeListener();
    }

    public setup(...args: Array<any>) {
        this._stage = args[0];
        this.onResize();
    }

    private initResizeListener() {
        window.addEventListener("resize", this.onResize.bind(this));
    }

    private onResize() {
        Global.renderManager.resizeCanvas(window.innerWidth, window.innerHeight);
        this._stage.width = window.innerWidth;
        this._stage.height = window.innerHeight;

        this.data.sizeData.screenSize.x = window.innerWidth;
        this.data.sizeData.screenSize.y = window.innerHeight;

        this.data.sizeData.screenFactor.x =  window.innerWidth / this.data.sizeData.gameWidth;
        this.data.sizeData.screenFactor.y = window.innerHeight / this.data.sizeData.gameHeight;

        this.fireEvent(EventType.ON_RESIZE, this.data.sizeData.screenSize);
    }

}