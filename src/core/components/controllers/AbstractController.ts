import { EventDispatcher } from "../events/EventDispatcher";
import { inject } from "../../injects/inject";
import { IView } from "../views/IView";
import { ListenerFn } from 'eventemitter3';
import { isNullOrUndefined } from "util";

export abstract class AbstractController {
    protected view!: IView | undefined;
    private _listenersMap: { [key: string]: Array<ListenerFn> } = {};
    private _viewListenersMap: { [key: string]: Array<ListenerFn> } = {};
    private _dispatcher: EventDispatcher = inject(EventDispatcher);

    /**
     * Setup view component and initialize data
     */
    public setView(view: IView): void {
        this.view = view;
        this.initialize();
    }

    /**
     * Invoke during removed view component
     */
    public destroy(): void {
        this.removeAllListeners();
        this.removeAllViewListeners();
        this.view = undefined;
    }

    /**
     * Initialize data which relate to this controller-view
     */
    protected abstract initialize(): void;

    /**
     * Method to dispatch events
     */
    protected dispatch(eventName: string, ...args: any[]): void {
        this._dispatcher.dispatch(eventName, ...args);
    }

    /**
     * Method to add dispatcher listener
     * Listener function add to listener pool
     */
    protected addListener(eventName: string, fn: ListenerFn): void {
        this._dispatcher.addListener(eventName, fn, this);
        if (isNullOrUndefined(this._listenersMap[eventName])) {
            this._listenersMap[eventName] = [];
        }
        this._listenersMap[eventName].push(fn);
    }

    /**
     * Method to add view listener
     * Listener function add to view listener pool
     */
    protected addViewListener(eventName: string, fn: ListenerFn): void {
        if (!this.view) {
            throw new Error("View listener can't be added when view not initialized!!!");
        }
        this.view.on(eventName, fn, this);
        if (isNullOrUndefined(this._viewListenersMap[eventName])) {
            this._viewListenersMap[eventName] = [];
        }
        this._viewListenersMap[eventName].push(fn);
    }

    /**
     * Method to remove view listener by view listener pool data
     */
    protected removeViewListener(eventName: string): void {
        const listenersForEvent: Array<ListenerFn> = this._viewListenersMap[eventName];
        if (listenersForEvent) {
            for (const fn of listenersForEvent) {
                if (this.view) {
                    this.view.off(eventName, fn, this);
                }
            }
            delete this._viewListenersMap[eventName];
        } else {
            console.warn("There are no any listeners for event " + eventName);
        }
    }

    /**
     * Method to remove all view listeners by view listener pool data
     */
    protected removeAllViewListeners(): void {
        for (const key of Object.keys(this._viewListenersMap)) {
            this.removeViewListener(key);
        }
        this._viewListenersMap = {};
    }

    /**
     * Method to remove listener by listener pool data
     */
    protected removeListener(eventName: string): void {
        const listenersForEvent: Array<ListenerFn> = this._listenersMap[eventName];
        if (listenersForEvent) {
            for (const fn of listenersForEvent) {
                this._dispatcher.off(eventName, fn, this);
            }
            delete this._listenersMap[eventName];
        } else {
            console.warn("There are no any listeners for event " + eventName);
        }
    }

    /**
     * Method to remove all listeners by listener pool data
     */
    protected removeAllListeners(): void {
        for (const key of Object.keys(this._listenersMap)) {
            this.removeListener(key);
        }
        this._listenersMap = {};
    }
}
