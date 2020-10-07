import { EventDispatcher } from "../../../../components/events/EventDispatcher";
import { inject } from "../../../../injects/inject";
import { LoadManager } from "../../assetLoader/managers/LoadManager";
import { AssetsGroup } from "../../assetLoader/types/AssetsGroup";
import { AbstractAssetData } from "../../assetLoader/models/data/AbstractAssetData";
import { LoadModel } from "../../assetLoader/models/LoadModel";
import { Action } from "../../../../components/actions/Action";
import { CoreEvents } from "../../CoreEvents";

export class PreloadAssetsAction extends Action {
    protected dispatcher: EventDispatcher = inject(EventDispatcher);
    protected loadManager: LoadManager = inject(LoadManager);
    protected loadModel: LoadModel = inject(LoadModel);

    protected onExecute(): void {
        this.loadManager.initAssetsPool();

        let assetList: Array<AbstractAssetData> = this.loadModel.getNotLoadedAssetsByGroup(AssetsGroup.PRELOAD);
        this.loadManager.loadAssets(assetList)
            .then(this.onPreloadAssetsLoaded.bind(this));
    }

    protected onPreloadAssetsLoaded(): void {
        this.dispatcher.dispatch(CoreEvents.PRELOAD_ASSETS_LOADED);
        this.onFinish();
    }
}