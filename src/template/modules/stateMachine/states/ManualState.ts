import { AbstractState } from "../../../../core/engine/modules/stateMachine/states/AbstractState";
import { TemplateStateType } from "../types/TemplateStateType";
import { IAction } from "../../../../core/components/actions/IAction";
import { BoxAction } from "../../boy/actions/BoxAction";

export class ManualState extends AbstractState {
    public readonly name: string = TemplateStateType.ManualState;

    protected getInitialNextState(): string {
        return TemplateStateType.RestartState;
    }

    protected initAction(): IAction {
        return new BoxAction();
    }
}

