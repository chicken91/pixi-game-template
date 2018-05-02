import {Unit} from "../../common/components/Unit";
import {EventDispatcher} from "../../common/dispatcher/EventDispatcher";
import {EventType} from "../../common/type/EventType";
import {Global} from "../../common/global/Global";
import {GameData} from "../data/GameData";

export class ResizeService extends Unit {

    constructor(dispatcher: EventDispatcher, data: GameData) {
        super(dispatcher, data);
        this.initResizeListener();
    }

    private initResizeListener() {
        window.addEventListener("resize", this.onResize.bind(this));
        this.onResize();
    }

    private onResize() {
        if (window.innerWidth > window.innerHeight) {
            this.data.sizeData.screenSize.x = Math.round(Math.min(window.innerHeight * this.data.sizeData.gameRatio, window.innerWidth));
            this.data.sizeData.screenSize.y = Math.round(Math.min(this.data.sizeData.screenSize.x / this.data.sizeData.gameRatio, window.innerHeight));
        } else {
            this.data.sizeData.screenSize.y = Math.round(Math.min(window.innerWidth / this.data.sizeData.gameRatio, window.innerHeight));
            this.data.sizeData.screenSize.x = Math.round(this.data.sizeData.screenSize.y * this.data.sizeData.gameRatio);
        }

        this.data.sizeData.scale = Math.min(window.innerWidth / this.data.sizeData.gameWidth, window.innerHeight / this.data.sizeData.gameHeight);

        Global.renderManager.resizeCanvas(this.data.sizeData.screenSize.x, this.data.sizeData.screenSize.y);
        this.fireEvent(EventType.ON_RESIZE, this.data.sizeData.screenSize);
    }

}