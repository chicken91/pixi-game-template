import {Unit} from "../../common/components/Unit";
import {EventType} from "../../common/type/EventType";
import {Global} from "../../common/global/Global";

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
        this.data.size.screenSize.x = window.innerWidth;
        this.data.size.screenSize.y = window.innerHeight;

        Global.renderManager.resizeCanvas(this.data.size.screenSize.x, this.data.size.screenSize.y);
        this.fireEvent(EventType.ON_RESIZE, this.data.size.screenSize);
    }

}