import { IStateMachine } from "../entity/IStateMachine";

export interface IState {
    name: string;

    onEnter(fsm: IStateMachine): void;

    onLeave(): Promise<any>;
}