import { StateMachine } from "../../../core/engine/modules/stateMachine/entity/StateMachine";
import { IStateMachineOptions } from "../../../core/engine/modules/CoreTypes";
import { AutoplayState } from "../states/AutoplayState";
import { ManualState } from "../states/ManualState";
import { RestartState } from "../states/RestartState";
import { LoadState } from "../../../core/engine/modules/stateMachine/states/LoadState";

export class TemplateStateMachine extends StateMachine {

    protected getStateMachineOptions(): IStateMachineOptions {
        return {
            initialState: LoadState,
            transitions: [
                {to: ManualState, from: [LoadState, AutoplayState, RestartState]},
                {to: AutoplayState, from: [ManualState]},
                {to: RestartState, from: [ManualState, AutoplayState]}
            ],
        };
    }
}
