import { StateMachine } from "../../../core/engine/modules/stateMachine/entity/StateMachine";
import { Kernel } from "../../../core/injects/Kernel";
import { ApplicationModule } from "../../../core/engine/modules/ApplicationModule";
import { TemplateStateMachine } from "./entity/TemplateStateMachine";
import { TemplateLoadState } from "./states/TemplateLoadState";
import { LoadState } from "../../../core/engine/modules/stateMachine/states/LoadState";
import { ManualState } from "./states/ManualState";
import { RestartState } from "./states/RestartState";

export class TemplateStateMachineModule extends ApplicationModule {
    protected addInjections(kernel: Kernel): void {
        kernel.bind(StateMachine).to(TemplateStateMachine);

        kernel.bind(LoadState).to(TemplateLoadState);
        kernel.bind(ManualState).asSingleton();
        kernel.bind(RestartState).asSingleton();
    }
}