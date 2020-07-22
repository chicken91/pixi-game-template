import { AbstractView } from "./AbstractView";
import { Container } from "pixi.js";

export abstract class WidgetView<T extends Container> extends AbstractView {
    private _widget: T | undefined;

    constructor(widget: T) {
        super();
        this._widget = widget;
        this.addChild(this._widget);
    }

    public get widget(): T {
        return <T>this._widget;
    }

    public set widget(value: T) {
        this._widget = value;
    }
}