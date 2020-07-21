import { AbstractAssetData } from "./AbstractAssetData";
import { ImageProvider } from "../../providers/ImageProvider";
import { inject } from "../../../../../injects/inject";
import { IImageResource } from "../../interfaces/IImageResource";

export class ImageAssetData extends AbstractAssetData {
    public loaderProvider: ImageProvider = inject(ImageProvider);

    protected initAssetSize(resourceData: IImageResource): void {
        if (resourceData.atlas) {
            this.size += this.loadModel.getSizeByUrl(resourceData.atlas);
        }
        this.size += this.loadModel.getSizeByUrl(resourceData.src);
    }
}