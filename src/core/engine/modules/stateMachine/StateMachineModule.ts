import { ApplicationModule } from '../ApplicationModule';
import { Kernel } from '../../../injects/Kernel';
import { StateMachineModel } from "./model/StateMachineModel";
import { StateMachine } from "./entity/StateMachine";
import { IdleState } from "./states/IdleState";
import { LoadState } from "./states/LoadState";

export class StateMachineModule extends ApplicationModule {
    protected addInjections(kernel: Kernel): void {
        kernel.bind(StateMachineModel).asSingleton();

        kernel.bind(StateMachine).asSingleton();

        kernel.bind(LoadState).asSingleton();
        kernel.bind(IdleState).asSingleton();
    }
}