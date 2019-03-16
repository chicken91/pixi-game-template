import {Unit} from "../../common/components/Unit";
import {EventDispatcher} from "../../common/dispatcher/EventDispatcher";
import {EventType} from "../../common/type/EventType";
import {Global} from "../../common/global/Global";
import {GameData} from "../data/GameData";
import {SizeData} from "../data/size/SizeData";

export class ResizeService extends Unit {

    constructor() {
        super();
        this.initResizeListener();
    }

    private initResizeListener() {
        window.addEventListener("resize", this.onResize.bind(this));
        this.onResize();
    }

    private onResize() {
        // if (window.innerWidth > window.innerHeight) {
        //     this.data.size.screenSize.x = Math.round(Math.min(window.innerHeight * this.data.size.gameRatio, window.innerWidth));
        //     this.data.size.screenSize.y = Math.round(Math.min(this.data.size.screenSize.x / this.data.size.gameRatio, window.innerHeight));
        // } else {
        //     this.data.size.screenSize.y = Math.round(Math.min(window.innerWidth / this.data.size.gameRatio, window.innerHeight));
        //     this.data.size.screenSize.x = Math.round(this.data.size.screenSize.y * this.data.size.gameRatio);
        // }
        //
        // this.data.size.scale = Math.min(window.innerWidth / SizeData.GAME_WIDTH, window.innerHeight / SizeData.GAME_HEIGHT);

        this.data.size.screenSize.x = window.innerWidth;
        this.data.size.screenSize.y = window.innerHeight;


        Global.renderManager.resizeCanvas(this.data.size.screenSize.x, this.data.size.screenSize.y);
        this.fireEvent(EventType.ON_RESIZE, this.data.size.screenSize);
    }

}