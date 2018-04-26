import {isNullOrUndefined} from "util";

export type ListenerCallback = (...args: Array<any>) => void

export class EventDispatcher {
    private _listeners: { [key: string]: Array<ListenerCallback> } = {};

    public addListener(message: string, listenerCallback: ListenerCallback) {
        if (isNullOrUndefined(this._listeners[message])) {
            this._listeners[message] = [];
        }

        this._listeners[message].push(listenerCallback);
    }

    public dispatch(message: string, ...args: Array<any>) {
        let callbacks: Array<ListenerCallback> = this._listeners[message];
        isNullOrUndefined(callbacks) || this.activateCallBacks(callbacks, args);
    }

    private activateCallBacks(callbacks: Array<ListenerCallback>, ...args: Array<any>) {
        for (let callback of callbacks) {
            callback(args);
        }
    }

}