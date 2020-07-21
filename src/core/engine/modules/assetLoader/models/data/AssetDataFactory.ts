import { AbstractAssetData } from "./AbstractAssetData";
import { AssetsType } from "../../types/AssetsType";
import { ImageAssetData } from "./ImageAssetData";
import { AbstractSoundAssetData } from "./AbstractSoundAssetData";
import { SpineAssetData } from "./SpineAssetData";
import { HowlerSoundAssetData } from "../../../sounds/data/HowlerSoundAssetData";
import { FontAssetData } from './FontAssetData';

export class AssetDataFactory {
    public createAssetDataByType(assetType: string): AbstractAssetData {
        switch (assetType) {
            case AssetsType.IMAGES:
                return this.createImageAssetData();
            case AssetsType.SPINES:
                return this.createSpineAssetData();
            case AssetsType.SOUNDS:
                return this.createSoundAssetData();
            case AssetsType.FONTS:
                return this.createFontAssetData();
            default:
                throw new Error("You are trying create asset with missing type [" + assetType + "]");

        }
    }

    protected createSoundAssetData(): AbstractSoundAssetData {
        return new HowlerSoundAssetData();
    }

    protected createImageAssetData(): ImageAssetData {
        return new ImageAssetData();
    }

    protected createSpineAssetData(): SpineAssetData {
        return new SpineAssetData();
    }

    protected createFontAssetData(): FontAssetData {
        return new FontAssetData();
    }
}