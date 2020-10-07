import { EventDispatcher } from "../../../../components/events/EventDispatcher";
import { inject } from "../../../../injects/inject";
import { LoadManager } from "../../assetLoader/managers/LoadManager";
import { AssetsGroup } from "../../assetLoader/types/AssetsGroup";
import { AbstractAssetData } from "../../assetLoader/models/data/AbstractAssetData";
import { LoadModel } from "../../assetLoader/models/LoadModel";
import { Action } from "../../../../components/actions/Action";
import { CoreEvents } from "../../CoreEvents";

export class InitialAssetsAction extends Action {
    protected dispatcher: EventDispatcher = inject(EventDispatcher);
    protected loadManager: LoadManager = inject(LoadManager);
    protected loadModel: LoadModel = inject(LoadModel);

    protected onExecute(): void {
        this.dispatcher.dispatch(CoreEvents.INITIAL_ASSETS_START_LOADING);
        let assetList: Array<AbstractAssetData> = this.loadModel.getNotLoadedAssetsByGroup(AssetsGroup.INITIAL);
        this.calculateInitialAssetsSize(assetList);
        this.loadManager.loadAssets(assetList)
            .then(this.onInitialAssetsLoaded.bind(this));
    }

    protected calculateInitialAssetsSize(assetDataList: Array<AbstractAssetData>): void {
        let totalInitialAssetsSize: number = 0;
        for (let assetData of assetDataList) {
            totalInitialAssetsSize += assetData.getAssetSize();
        }
        this.loadModel.initialAssetsTotalSize = totalInitialAssetsSize;
    }

    protected onInitialAssetsLoaded(): void {
        this.dispatcher.dispatch(CoreEvents.INITIAL_ASSETS_LOADED);
        this.onFinish();
    }
}