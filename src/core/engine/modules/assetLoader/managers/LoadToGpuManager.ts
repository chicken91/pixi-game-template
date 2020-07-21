import { EventDispatcher } from '../../../../components/events/EventDispatcher';
import { AssetsGroup } from '../types/AssetsGroup';
import { LoadModel } from "../models/LoadModel";
import { inject } from "../../../../injects/inject";
import { CoreEvents } from "../../CoreEvents";
import { RenderModel } from "../../screen/model/RenderModel";

/**
 * @class LoadToGpuManager
 *
 * Handle loaded "gpu" assets and load texture to gpu
 */
export class LoadToGpuManager {
    protected dispatcher: EventDispatcher = inject(EventDispatcher);
    protected loadModel: LoadModel = inject(LoadModel);
    protected renderModel: RenderModel = inject(RenderModel);

    protected suffix: string = '_image';
    protected assetsToLoad!: string[];
    protected interval!: number;
    protected intervalTimeout: number = 200;

    constructor() {
        this.dispatcher.addListener(CoreEvents.PRELOAD_ASSETS_LOADED, this.initialize, this);
    }

    protected initialize(): void {
        this.loadModel.onAssetsGroupLoaded(AssetsGroup.GPU, this.onAssetsLoaded.bind(this));
    }

    protected onAssetsLoaded(): void {
        const resources = this.loadModel.getAssetsByGroup(AssetsGroup.GPU);
        this.assetsToLoad = resources.map((resource) => {
            return (resource.resourceData as any).id + this.suffix;
        });

        this.onLoadResource();
    }

    protected onLoadResource(): void {
        const assetString = this.assetsToLoad.pop();
        if (assetString === undefined) {
            this.destroy();
            return;
        }
        this.uploadToGpu(PIXI.utils.BaseTextureCache[assetString])
            .then(() => {
                setTimeout(this.onLoadResource.bind(this), this.intervalTimeout);
            });
    }

    public uploadToGpu(asset: any): Promise<any> {
        return new Promise((resolve) => {
            this.renderModel.renderer.plugins.prepare.upload(asset, resolve);
        });
    }

    protected destroy(): void {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = 0;
        }
    }
}