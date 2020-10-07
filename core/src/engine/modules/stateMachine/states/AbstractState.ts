import { IState } from './IState';
import { EventDispatcher } from '../../../../components/events/EventDispatcher';
import { inject } from '../../../../injects/inject';
import { IAction, IStateInfo } from '../../../../components/actions/IAction';
import { IStateMachine } from "../entity/IStateMachine";

export abstract class AbstractState implements IState {
    public readonly abstract name: string;
    protected _action!: IAction;
    protected _actionPromise!: Promise<any>;

    protected dispatcher: EventDispatcher = inject(EventDispatcher);
    protected active: Boolean = false;
    protected fsm: IStateMachine | undefined;

    constructor() {
        this._action = this.initAction();
    }

    protected abstract initAction(): IAction;

    public onEnter(fsm: IStateMachine): void {
        this.active = true;
        this.fsm = fsm;

        this._actionPromise = this.runAction()
            .then(this.onFinish.bind(this));
    }

    protected runAction(): Promise<any> {
        return new Promise((resolve) => {
            this._action.run(this.actionInfo, resolve);
        });
    }

    protected get actionInfo(): IStateInfo {
        return {isTerminating: false, nextState: this.getInitialNextState()};
    }

    protected abstract getInitialNextState(): string;

    public onLeave(): Promise<any> {
        this.active = false;
        this.fsm = undefined;
        if (this._action.finished) {
            return Promise.resolve();
        }
        return this._actionPromise;
    }

    protected onFinish(actionInfo: IStateInfo): void {
        console.log('FINISH STATE');
        if (this.fsm) {
            this.fsm.changeState(actionInfo.nextState);
        }
    }
}