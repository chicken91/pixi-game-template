import { IHowlerSoundResource } from "../entity/howler/IHowlerSoundResource";
import { AbstractSoundAssetData } from "../../assetLoader/models/data/AbstractSoundAssetData";
import { HowlerSoundProvider } from "../providers/HowlerSoundProvider";

export class HowlerSoundAssetData extends AbstractSoundAssetData {
    public loaderProvider!: HowlerSoundProvider;

    protected initAssetSize(resourceData: IHowlerSoundResource): void {
        this.size += this.loadModel.getSizeByUrl(resourceData.spriteUrl);
        this.size += this.loadModel.getSizeByUrl(resourceData.src[0]);
    }
}