import { Container, Graphics } from 'pixi.js';
import { IView } from './IView';
import { SizeDelegator } from "./resizeProperty/SizeDelegator";
import { IResizeProperty } from "./resizeProperty/IResizeProperty";
import { ResizeProperty } from "./resizeProperty/ResizeProperty";
import { ListenerFn } from "eventemitter3";
import { EventDispatcher } from "../events/EventDispatcher";
import { inject } from "../../injects/inject";
import { isNullOrUndefined } from "util";

export abstract class AbstractView extends Container implements IView {
    private _dispatcher: EventDispatcher = inject(EventDispatcher);
    private _listenersMap: { [key: string]: Array<ListenerFn> } = {};
    public readonly sizeDelegator: SizeDelegator;

    constructor() {
        super();
        this.on("added", this.onAdded);
        this.on("removed", this.onRemoved);
        this.sizeDelegator = new SizeDelegator(this.createResizeProperty());
    }

    public onAdded(): void {
    }

    public onRemoved(): void {
        this.removeAllEventListeners();
        this.removeAllListeners()
    }

    public onResize(width?: number, height?: number): void {
        this.sizeDelegator.onResize(width, height);
    }

    public onActivate(width?: number, height?: number): void {
        this.sizeDelegator.onActivate();
    }

    public addMask(width: number, height: number, x: number = 0, y: number = 0): void {
        const mask: Graphics = new Graphics();
        mask.beginFill(0xFFFFFF, 1);
        mask.drawRect(x, y, width, height);
        mask.endFill();
        this.addChild(mask);
        this.mask = mask;
    }

    public createResizeProperty(): IResizeProperty {
        return new ResizeProperty(this);
    }

    protected dispatch(eventName: string, ...args: any[]): void {
        this._dispatcher.dispatch(eventName, ...args);
    }

    protected addEventListener(eventName: string, fn: ListenerFn): void {
        this._dispatcher.addListener(eventName, fn, this);
        if (isNullOrUndefined(this._listenersMap[eventName])) {
            this._listenersMap[eventName] = [];
        }
        this._listenersMap[eventName].push(fn);
    }

    protected removeAllEventListeners(): void {
        for (const key of Object.keys(this._listenersMap)) {
            this.removeListener(key);
        }
        this._listenersMap = {};
    }

    protected removeEventListener(eventName: string): void {
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
}