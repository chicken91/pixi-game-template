import { AbstractLoaderProvider } from "./AbstractLoaderProvider";
import { ISpineResource } from "../interfaces/ISpineResource";
import { SpineModel } from "../models/SpineModel";
import { inject } from "../../../../injects/inject";
import { AssetsType } from "../types/AssetsType";
import { LoadUtils } from "../utils/LoadUtils";
import Loader = PIXI.Loader;

export class SpineProvider extends AbstractLoaderProvider {
    protected spineModel: SpineModel = inject(SpineModel);
    protected loader: Loader = new Loader();

    public load(): Promise<any> {
        return new Promise<any>(resolve => {
            this.loader.load(resolve);
        });
    }

    public prepare(data: ISpineResource): void {
        this.loader.add(data.id, LoadUtils.appendHostUrl(data.dataUrl), this.addSpineData.bind(this, data.id));
    }

    private addSpineData(spineId: string): Promise<any> {
        let spineResource = this.loader.resources[spineId];
        this.spineModel.addSpineData(spineId, spineResource.spineData);
        return Promise.resolve();
    }

    public get type(): string {
        return AssetsType.SPINES;
    }
}