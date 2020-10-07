import { HowlerSoundProvider } from "./providers/HowlerSoundProvider";
import { Kernel } from "../../../injects/Kernel";
import { ApplicationModule } from "../ApplicationModule";
import { AbstractSoundManager } from "./managers/AbstractSoundManager";
import { AbstractSoundProvider } from "../assetLoader/providers/AbstractSoundProvider";
import { HowlerSoundManager } from "./managers/howler/HowlerSoundManager";
import { SoundModel } from "./models/SoundModel";
import { HowlerSoundModel } from "./models/howler/HowlerSoundModel";

export class HowlerSoundModule extends ApplicationModule {

    protected addInjections(kernel: Kernel): void {
        kernel.bind(SoundModel).to(HowlerSoundModel);
        kernel.bind(AbstractSoundManager).to(HowlerSoundManager).asSingleton().forceCreation();
        kernel.bind(AbstractSoundProvider).to(HowlerSoundProvider);
    }
}