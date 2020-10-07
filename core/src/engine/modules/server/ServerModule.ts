import { ApplicationModule } from '../ApplicationModule';
import { ServerManager } from "./managers/ServerManager";
import { ServerRequestFactory } from "./factory/ServerRequestFactory";
import { InitializeServerAction } from "./actions/InitializeServerAction";
import { Kernel } from "../../../injects/Kernel";

export class ServerModule extends ApplicationModule {
    protected addInjections(kernel: Kernel): void {
        kernel.bind(ServerRequestFactory).asSingleton();
        kernel.bind(ServerManager).asSingleton().forceCreation();
        kernel.bind(InitializeServerAction);
    }

}