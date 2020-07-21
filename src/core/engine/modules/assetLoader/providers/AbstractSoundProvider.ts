import { AbstractLoaderProvider } from "./AbstractLoaderProvider";
import { AbstractSound } from "../../sounds/entity/AbstractSound";
import { inject } from "../../../../injects/inject";
import { AssetsType } from "../types/AssetsType";
import { SoundModel } from "../../sounds/models/SoundModel";

export abstract class AbstractSoundProvider extends AbstractLoaderProvider {
    protected soundModel: SoundModel = inject(SoundModel);

    protected addSound(sound: AbstractSound): void {
        this.soundModel.addSound(sound);
    }

    protected abstract createSound(id: string, soundInstance: any): AbstractSound;

    public get type(): string {
        return AssetsType.SOUNDS;
    }
}