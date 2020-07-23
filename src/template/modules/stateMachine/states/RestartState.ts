import { AbstractState } from "../../../../core/engine/modules/stateMachine/states/AbstractState";
import { TemplateStateType } from "../types/TemplateStateType";
import { IAction } from "../../../../core/components/actions/IAction";
import { SequenceAction } from "../../../../core/components/actions/SequenceAction";
import { TapToStartAction } from "../../main/actions/TapToStartAction";
import { RestartMessageAction } from "../../main/actions/RestartMessageAction";

export class RestartState extends AbstractState {
    public readonly name: string = TemplateStateType.RestartState;

    protected getInitialNextState(): string {
        return TemplateStateType.ManualState;
    }

    protected initAction(): IAction {
        return new SequenceAction([
            RestartMessageAction,
            TapToStartAction
        ]);
    }
}

