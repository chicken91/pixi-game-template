import { AbstractAssetData } from "./AbstractAssetData";
import { inject } from "../../../../../injects/inject";
import { AbstractSoundProvider } from "../../providers/AbstractSoundProvider";

export abstract class AbstractSoundAssetData extends AbstractAssetData {
    public loaderProvider: AbstractSoundProvider = inject(AbstractSoundProvider);
}