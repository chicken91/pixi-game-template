import Container = PIXI.Container;
import {BaseView} from "../../common/components/BaseView";
import {EventType} from "../../common/type/EventType";
import {MainView} from "./main/MainView";
import {LoadView} from "./load/LoadView";

export class StageView extends BaseView {

    protected addListeners(): void {
        super.addListeners();
        this.addListener(EventType.ON_ASSETS_LOADED, this.onAssetsLoaded.bind(this));
    }

    protected setupChildren(parent: Container) {
        super.setupChildren(parent);
        this.addChild(new LoadView().setup(parent));
    }

    private onAssetsLoaded() {
        this.addChildAt(new MainView().setup(this.view()), 0);
        this.dispatcher.dispatch(EventType.ON_INIT_MAIN_VIEW);
    }
}