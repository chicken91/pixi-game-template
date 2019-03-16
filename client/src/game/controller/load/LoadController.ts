import {EventType} from "../../../common/type/EventType";
import {BaseController} from "../../../common/components/BaseController";
import {Resources} from "../../constants";


export class LoadController extends BaseController {

    protected addListeners(): void {
        this.addListener(EventType.ON_CONTEXT_INIT, this.onContextInit.bind(this));
    }

    private onContextInit() {
        for (let assets of Resources.images) {
            PIXI.loader.add(assets.id, assets.path);
        }
        PIXI.loader.load(this.onAssetsLoaded.bind(this));
    }

    private onAssetsLoaded(): void {
        this.dispatcher.dispatch(EventType.ON_ASSETS_LOADED);
    }
}