import { ApplicationModule } from "../../../core/engine/modules/ApplicationModule";
import { Kernel } from "../../../core/injects/Kernel";
import { BoyView } from "./views/BoyView";
import { BoyController } from "./controllers/BoyController";
import { BoxAction } from "./actions/BoxAction";

export class BoyModule extends ApplicationModule {

    protected addInjections(kernel: Kernel): void {
        kernel.bind(BoxAction).asSingleton();

        kernel.bindController(BoyController).toView(BoyView);
        kernel.bindView(BoyView).toId("boyView");
    }
}