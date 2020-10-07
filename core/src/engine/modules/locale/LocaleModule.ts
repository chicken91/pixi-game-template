import { LocaleModel } from './models/LocaleModel';
import { ApplicationModule } from "../ApplicationModule";
import { Kernel } from "../../../injects/Kernel";

export class LocaleModule extends ApplicationModule {
    protected addInjections(kernel: Kernel): void {
        kernel.bind(LocaleModel).asSingleton().forceCreation();
    }

}