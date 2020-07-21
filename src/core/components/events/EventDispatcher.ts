import { EventEmitter } from "eventemitter3";

/**
 * @class EventDispatcher
 *
 * Provide communication between different next part of application:
 * controllers/managers/actions/states
 *
 * Don`t use it in models and view component!
 * Views communication should be implemented through controllers
 * Models haven`t any events functionality
 */
export class EventDispatcher extends EventEmitter {
    public logginEnabled: boolean = false;

    dispatch(event: string, ...args: any[]): void {
        super.emit(event, ...args);
    }

    public emit(event: string, ...args: any[]): boolean {
        if (__DEV__ && this.logginEnabled) {
            this.logEvent(event, args);
        }

        return super.emit(event, ...args);
    }

    protected logEvent(event: string, ...args: any[]): void {
        console.log(event + args ? ', data -> ' + args : '');
    }
}
