import Container = PIXI.Container;
import {BaseView} from "../../common/components/BaseView";
import {EventType} from "../../common/type/EventType";
import {MainView} from "./main/MainView";
import {InteractionView} from "./main/reel/InteractionView";
import Graphics = PIXI.Graphics;
import {SizeData} from "../data/size/SizeData";
import {LoadView} from "./load/LoadView";

export class StageView extends BaseView {

    protected addListeners(): void {
        super.addListeners();
        this.addListener(EventType.ON_RESIZE, this.onResize.bind(this));
    }

    protected setupChildren(parent: Container) {
        super.setupChildren(parent);
        this.addChild(new MainView().setup(parent));
        this.addChild(new LoadView().setup(parent));
        //this.addChild(new InteractionView().setup(parent));
        this.onResize();
    }

    private onResize() {


    }
}