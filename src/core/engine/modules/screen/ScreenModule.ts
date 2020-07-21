import { TimerManager } from './manager/TimerManager';
import { RenderManager } from "./manager/RenderManager";
import { ApplicationModule } from "../ApplicationModule";
import { Kernel } from "../../../injects/Kernel";
import { ResizeManager } from "./manager/ResizeManager";
import { ScreenModel } from "./model/ScreenModel";
import { RenderModel } from "./model/RenderModel";

export class ScreenModule extends ApplicationModule {
    protected addInjections(kernel: Kernel): void {
        kernel.bind(ScreenModel).asSingleton();
        kernel.bind(RenderModel).asSingleton();

        kernel.bind(TimerManager).asSingleton().forceCreation();
        kernel.bind(RenderManager).asSingleton().forceCreation();
        kernel.bind(ResizeManager).asSingleton().forceCreation();

    }
}