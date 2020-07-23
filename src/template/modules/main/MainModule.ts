import { MainView } from "./views/MainView";
import { ApplicationModule } from "../../../core/engine/modules/ApplicationModule";
import { Kernel } from "../../../core/injects/Kernel";
import { MainController } from "./controllers/MainController";
import { TapToStartAction } from "./actions/TapToStartAction";
import { RestartMessageAction } from "./actions/RestartMessageAction";
import { TemplateGameModel } from "./model/TemplateGameModel";
import { GameModel } from "../../../core/engine/modules/game/model/GameModel";

export class MainModule extends ApplicationModule {

    protected addInjections(kernel: Kernel): void {
        kernel.bind(GameModel).to(TemplateGameModel);

        kernel.bind(TapToStartAction);
        kernel.bind(RestartMessageAction).asSingleton();

        kernel.bindController(MainController).toView(MainView);
        kernel.bindView(MainView).toId("mainView");
    }
}