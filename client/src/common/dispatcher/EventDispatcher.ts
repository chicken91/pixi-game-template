import {isNullOrUndefined} from "util";

export type ListenerCallback = (arg: any) => void

export class EventDispatcher {
    private _listeners: { [key: string]: Array<ListenerCallback> } = {};

    public addListener(message: string, listenerCallback: ListenerCallback) {
        if (isNullOrUndefined(this._listeners[message])) {
            this._listeners[message] = [];
        }

        this._listeners[message].push(listenerCallback);
    }

    public dispatch(message: string, arg?: any) {
        let callbacks: Array<ListenerCallback> = this._listeners[message];
        isNullOrUndefined(callbacks) || this.activateCallBacks(callbacks, arg);
    }

    private activateCallBacks(callbacks: Array<ListenerCallback>, arg: any) {
        for (let callback of callbacks) {
            callback(arg);
        }
    }

}