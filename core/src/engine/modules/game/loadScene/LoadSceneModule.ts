import { ProgressBarView } from "./views/ProgressBarView";
import { ProgressBarController } from "./controllers/ProgressBarController";
import { LoadView } from "./views/LoadView";
import { LoadController } from "./controllers/LoadController";
import { ApplicationModule } from "../../ApplicationModule";
import { Kernel } from "../../../../injects/Kernel";

export class LoadSceneModule extends ApplicationModule {

    protected addInjections(kernel: Kernel): void {

        kernel.bindView(LoadView).toId('loadView');
        kernel.bindController(LoadController).toView(LoadView);

        kernel.bindView(ProgressBarView).toId('progressBarView');
        kernel.bindController(ProgressBarController).toView(ProgressBarView);
    }
}