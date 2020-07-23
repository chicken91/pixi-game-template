import { ApplicationModule } from "../../../core/engine/modules/ApplicationModule";
import { Kernel } from "../../../core/injects/Kernel";
import { AutoPlayButtonSwitcherView } from "./views/AutoPlayButtonSwitcherView";
import { AutoPlayButtonController } from "./controllers/AutoPlayButtonController";

export class AutoPlayModule extends ApplicationModule {

    protected addInjections(kernel: Kernel): void {
        kernel.bindController(AutoPlayButtonController).toView(AutoPlayButtonSwitcherView);
        kernel.bindView(AutoPlayButtonSwitcherView).toId("autoPlayButtonView");
    }
}