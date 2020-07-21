import { EventDispatcher } from "../../../../components/events/EventDispatcher";
import { inject } from "../../../../injects/inject";
import { LoadModel } from "../models/LoadModel";
import { AbstractAssetData } from "../models/data/AbstractAssetData";
import { IBaseResource } from "../interfaces/IBaseResource";
import { AssetDataFactory } from "../models/data/AssetDataFactory";
import { CoreEvents } from "../../CoreEvents";


/**
 * @class LoadManager
 * Manage load assets data, start and handle loading process by each asset
 *
 */
export class LoadManager {
    protected dispatcher: EventDispatcher = inject(EventDispatcher);
    protected loadModel: LoadModel = inject(LoadModel);
    protected assetDataFactory: AssetDataFactory = inject(AssetDataFactory);

    /**
     * Create asset data for each load component and store it in asset pool
     */
    public initAssetsPool(): void {
        for (let resourceKey of this.loadModel.getResourceTypes()) {
            let assetResourceList: Array<IBaseResource> = this.loadModel.getResourcesByType(resourceKey);
            for (let resource of assetResourceList) {
                this.addAssetData(resourceKey, resource);
            }
        }
    }

    public addAssetData(resourceKey, resource: IBaseResource): void {
        let assetData: AbstractAssetData = this.assetDataFactory.createAssetDataByType(resourceKey);
        assetData.setup(resource, this.loadModel);
        this.loadModel.addAssetData(assetData);
        this.loadModel.addResourceData(resource);
    }

    public loadAssets(assetDataList: Array<AbstractAssetData>): Promise<any> {
        let loadPromiseList: Array<Promise<any>> = [];
        for (let assetData of assetDataList) {
            let loadChainPromise = assetData.load().then(this.onAssetLoaded.bind(this));
            loadPromiseList.push(loadChainPromise);
        }
        return Promise.all(loadPromiseList);
    }

    protected onAssetLoaded(assetData: AbstractAssetData): void {
        this.dispatcher.dispatch(CoreEvents.ASSET_LOADED, assetData);
    }
}
