import { MainView } from "./views/MainView";
import { ApplicationModule } from "../../../core/src/engine/modules/ApplicationModule";
import { Kernel } from "../../../core/src/injects/Kernel";

export class MainModule extends ApplicationModule {

    protected addInjections(kernel: Kernel): void {
        kernel.bindView(MainView).toId("mainView");
    }
}