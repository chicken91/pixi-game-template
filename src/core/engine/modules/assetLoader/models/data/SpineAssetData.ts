import { AbstractAssetData } from "./AbstractAssetData";
import { ISpineResource } from "../../interfaces/ISpineResource";
import { SpineProvider } from "../../providers/SpineProvider";
import { inject } from "../../../../../injects/inject";

export class SpineAssetData extends AbstractAssetData {
    public loaderProvider: SpineProvider = inject(SpineProvider);

    protected initAssetSize(resourceData: ISpineResource): void {
        this.size += this.loadModel.getSizeByUrl(resourceData.dataUrl);
        this.size += this.loadModel.getSizeByUrl(resourceData.src);
    }
}