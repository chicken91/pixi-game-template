import { AbstractState } from "../../../core/engine/modules/stateMachine/states/AbstractState";
import { TemplateStateType } from "../types/TemplateStateType";
import { IAction } from "../../../core/components/actions/IAction";
import { SequenceAction } from "../../../core/components/actions/SequenceAction";

export class AutoplayState extends AbstractState {
    public readonly name: string = TemplateStateType.AutoplayState;

    protected getInitialNextState(): string {
        return "";
    }

    protected initAction(): IAction {
        return new SequenceAction([]);
    }
}

