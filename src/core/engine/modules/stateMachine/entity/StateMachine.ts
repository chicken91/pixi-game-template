import { IState } from '../states/IState';
import { inject } from '../../../../injects/inject';
import { StateMachineModel } from "../model/StateMachineModel";
import { IdleState } from "../states/IdleState";
import { IStateMachineOptions } from "../../CoreTypes";
import { IStateMachine } from "./IStateMachine";
import { LoadState } from "../states/LoadState";

export class StateMachine implements IStateMachine {
    protected stateMachineModel: StateMachineModel = inject(StateMachineModel);
    protected transitionMap: { [id: string]: { from: IState[], to: IState } } = {};
    protected currentState!: IState;
    private _activated: boolean = false;

    public activate() {
        if (!this._activated) {
            const options: IStateMachineOptions = this.getStateMachineOptions();
            this.initTransitionMap(options);
            const initialState = inject(options.initialState);
            this.onEnterNextState(initialState);
        }
    }

    protected initTransitionMap(options: IStateMachineOptions): void {
        for (let i: number = 0; i < options.transitions.length; i++) {
            const transition = options.transitions[i];
            const from: IState[] = transition.from.map(fromConstructor => {
                return inject(fromConstructor);
            });
            const to: IState = inject(transition.to);

            this.transitionMap[to.name] = {from, to};
        }
    }

    public changeState(nextStateName: string): boolean {
        const nextStateAvailableTransition = this.transitionMap[nextStateName];
        if (nextStateAvailableTransition) {
            const fromStates = nextStateAvailableTransition.from;
            if (fromStates.indexOf(this.currentState) !== -1) {
                const nextState = nextStateAvailableTransition.to;
                this.currentState.onLeave()
                    .then(this.onEnterNextState.bind(this, nextState), this.onEnterNextState.bind(this, nextState));
                return true;
            } else {
                console.error(`%c` + `Invalid transition from ${this.currentState.name} to ${nextStateName}!`, `color:#ff4000;font-weight:bold`);
                return false;
            }
        } else {
            console.error(`no state --> ${nextStateName}`);
            return false;
        }
    }

    protected onEnterNextState(nextState: IState): void {
        const currentStateName: string = this.currentState ? this.currentState.name : "";
        console.log(`%c` + `FSM transitioning from ${currentStateName} to ${nextState.name}`, `color:#33cc33;font-weight:bold`);

        this.currentState = nextState;
        this.stateMachineModel.setActiveState(this.currentState.name);
        this.currentState.onEnter(this);
    }

    protected getStateMachineOptions(): IStateMachineOptions {
        return {
            initialState: LoadState,
            transitions: [
                {from: [LoadState], to: IdleState}
            ],
        };
    }
}
