import { EventDispatcher } from "../../../../components/events/EventDispatcher";
import { inject } from "../../../../injects/inject";
import { LoadManager } from "../../assetLoader/managers/LoadManager";
import { LoadModel } from "../../assetLoader/models/LoadModel";
import { AbstractAssetData } from "../../assetLoader/models/data/AbstractAssetData";
import { Action } from "../../../../components/actions/Action";
import { CoreEvents } from "../../CoreEvents";

export class LazyAssetsAction extends Action {
    protected dispatcher: EventDispatcher = inject(EventDispatcher);
    protected loadManager: LoadManager = inject(LoadManager);
    protected loadModel: LoadModel = inject(LoadModel);

    protected onExecute(): void {
        const assetList: Array<AbstractAssetData> = this.loadModel.getNotLoadedAssets();
        this.loadManager.loadAssets(assetList)
            .then(this.onLazyAssetsLoaded.bind(this));
        this.onFinish();
    }

    protected onLazyAssetsLoaded(): void {
        this.loadModel.onLazyAssetsLoaded();
        this.dispatcher.dispatch(CoreEvents.LAZY_ASSETS_LOADED);
    }
}