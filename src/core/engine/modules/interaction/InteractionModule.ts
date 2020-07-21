import { ApplicationModule } from '../ApplicationModule';
import { Kernel } from '../../../injects/Kernel';
import { KeyboardManager } from "./managers/KeyboardManager";
import { CoreConstants } from "../CoreConstants";
import { InteractionEventManager } from "./managers/InteractionEventManager";

export class InteractionModule extends ApplicationModule {

    protected addInjections(kernel: Kernel): void {
        if (CoreConstants.deviceType.DESKTOP) {
            kernel.bind(KeyboardManager).asSingleton().forceCreation();
        }
        kernel.bind(InteractionEventManager).asSingleton().forceCreation();
    }
}