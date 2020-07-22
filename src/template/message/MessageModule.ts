import { ApplicationModule } from "../../core/engine/modules/ApplicationModule";
import { Kernel } from "../../core/injects/Kernel";
import { TapToStartAction } from "../main/actions/TapToStartAction";
import { RestartMessageAction } from "./actions/RestartMessageAction";
import { MessageController } from "./controllers/MessageController";
import { MessageView } from "./views/MessageView";

export class MessageModule extends ApplicationModule {

    protected addInjections(kernel: Kernel): void {
        kernel.bind(TapToStartAction);
        kernel.bind(RestartMessageAction).asSingleton();

        kernel.bindController(MessageController).toView(MessageView);
        kernel.bindView(MessageView).toId("messageView");
    }
}