import { AbstractAssetData } from "./AbstractAssetData";
import { inject } from "../../../../../injects/inject";
import { FontProvider } from '../../providers/FontProvider';
import { IFontResource } from '../../interfaces/IFontResource';

export class FontAssetData extends AbstractAssetData {
    public loaderProvider: FontProvider = inject(FontProvider);

    protected initAssetSize(resourceData: IFontResource): void {
        this.size += this.loadModel.getSizeByUrl(resourceData.fontUrl);
    }
}