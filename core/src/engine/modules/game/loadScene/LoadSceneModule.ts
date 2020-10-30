import { ProgressBarView } from "./views/ProgressBarView";
import { LoadView } from "./views/LoadView";
import { ApplicationModule } from "../../ApplicationModule";
import { Kernel } from "../../../../injects/Kernel";

export class LoadSceneModule extends ApplicationModule {

    protected addInjections(kernel: Kernel): void {
        kernel.bindView(LoadView).toId('loadView');
        kernel.bindView(ProgressBarView).toId('progressBarView');
    }
}