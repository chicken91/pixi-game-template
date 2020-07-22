import { MainView } from "./views/MainView";
import { ApplicationModule } from "../../core/engine/modules/ApplicationModule";
import { Kernel } from "../../core/injects/Kernel";
import { MainController } from "./controllers/MainController";
import { BoxAction } from "./actions/BoxAction";

export class MainModule extends ApplicationModule {

    protected addInjections(kernel: Kernel): void {
        kernel.bind(BoxAction).asSingleton();

        kernel.bindController(MainController).toView(MainView);
        kernel.bindView(MainView).toId("mainView");
    }
}