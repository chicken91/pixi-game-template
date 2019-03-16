import Container = PIXI.Container;
import {BaseView} from "../../common/components/BaseView";
import {EventType} from "../../common/type/EventType";
import {MainView} from "./MainView";
import {InteractionView} from "./reel/InteractionView";
import Graphics = PIXI.Graphics;
import {SizeData} from "../data/size/SizeData";

export class StageView extends BaseView {

    protected addListeners(): void {
        super.addListeners();
        this.addListener(EventType.ON_RESIZE, this.onResize.bind(this));
    }

    protected setupChildren(parent: Container) {
        super.setupChildren(parent);
        this.addChild(new MainView().setup(parent));
        //this.addChild(new InteractionView().setup(parent));
        this.onResize();
    }

    private onResize() {


    }
}