import { IResizeProperty } from "./IResizeProperty";
import { Point } from "pixi.js";
import { isNullOrUndefined } from "util";
import { AbstractView } from "../AbstractView";
import { Size } from "../../../engine/modules/screen/instance/Size";

export class ResizeProperty implements IResizeProperty {
    protected _view: AbstractView;
    public relativePosition!: Point;
    public position!: Point;
    public anchor!: Point;
    public globalPositioning: boolean = true;
    public scale!: Point;
    public size!: Size;
    public remove!: boolean;

    constructor(view: AbstractView) {
        this._view = view;
    }

    public onResize(width?: number, height?: number): void {
        // NOTE: if will be issue with resize, move anchor property to onResize method
        if (this.anchor) {
            this._view.pivot.set((this._view.width * this.anchor.x) / this._view.scale.x, (this._view.height * this.anchor.y) / this._view.scale.y);
        }

        if (this.relativePosition) {
            this._view.x = this.getRelativeWidth(width) * this.relativePosition.x;
            this._view.y = this.getRelativeHeight(height) * this.relativePosition.y;
        }
    }

    public onActivate(width?: number, height?: number): void {
        if (this.scale) {
            this._view.scale.set(this.scale.x, this.scale.y);
        }

        if (this.size) {
            this._view.width = this.size.width;
            this._view.height = this.size.height;
        }

        // NOTE: if will be issue with resize, move anchor property to onResize method
        if (this.anchor) {
            this._view.pivot.set((this._view.width * this.anchor.x) / this._view.scale.x, (this._view.height * this.anchor.y) / this._view.scale.x);
        }

        if (isNullOrUndefined(this.relativePosition) && this.position) {
            this._view.x = this.position.x;
            this._view.y = this.position.y;
        }

        this._view.renderable = !this.remove;

        this.onResize(width, height);
    }

    public onApplyProperty(layout: any): void {
        if (!isNullOrUndefined(layout.position)) {
            this.position = new Point(layout.position.x || 0, layout.position.y || 0);
        }
        if (!isNullOrUndefined(layout.rPos)) {
            this.relativePosition = new Point(layout.rPos.x || 0, layout.rPos.y || 0);
        }
        if (!isNullOrUndefined(layout.global)) {
            this.globalPositioning = layout.global;
        }
        if (!isNullOrUndefined(layout.anchor)) {
            this.anchor = new Point(layout.anchor.x || 0, layout.anchor.y || 0);
        }
        if (!isNullOrUndefined(layout.scale)) {
            this.scale = new Point(layout.scale.x || 0, layout.scale.y || 0);
        }
        if (!isNullOrUndefined(layout.size)) {
            this.size = new Size(layout.size.width || 0, layout.size.height || 0);
        }
        if (!isNullOrUndefined(layout.remove)) {
            this.remove = layout.remove;
        }
    }

    protected getRelativeWidth(width?: number): number {
        return width || (this.globalPositioning) ? window.innerWidth : this._view.parent.width;
    }

    protected getRelativeHeight(height?: number): number {
        return height || (this.globalPositioning) ? window.innerHeight : this._view.parent.height;
    }
}