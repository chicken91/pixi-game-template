import { StateType } from "../types/StateType";
import { IAction } from "../../../../components/actions/IAction";
import { SequenceAction } from "../../../../components/actions/SequenceAction";
import { AbstractState } from "./AbstractState";
import { bind } from "../../../../injects/inject";

@bind({singleton: true})
export class IdleState extends AbstractState {
    public readonly name: string = StateType.IdleState;

    protected getInitialNextState(): string {
        return "";
    }

    protected initAction(): IAction {
        return new SequenceAction([]);
    }
}

