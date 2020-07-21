import { ResizeProperty } from "./ResizeProperty";
import { Size } from "../../../engine/modules/screen/instance/Size";
import { GroupContainerType } from "../../types/GroupContainerType";
import { isNullOrUndefined } from "util";
import { AbstractView } from "../AbstractView";

export class FitResizeProperty extends ResizeProperty {
    private _scaleFunctionMap: { [type: string]: Function } = {};
    public base!: Size;
    public maxScale!: number;
    public fitType!: string;

    constructor(view: AbstractView) {
        super(view);
        this._scaleFunctionMap[GroupContainerType.FIT] = Math.min.bind(this);
        this._scaleFunctionMap[GroupContainerType.FILL] = Math.max.bind(this);
    }

    public onResize(width?: number, height?: number): void {
        super.onResize(width, height);
        if (this.base) {
            let scaleFunction = this._scaleFunctionMap[this.fitType];
            let scale = scaleFunction(this.getRelativeWidth(width) / this.base.width, this.getRelativeHeight(height) / this.base.height);
            if (this.maxScale) {
                let minScale = Math.min(scale, this.maxScale);
                this._view.scale.set(minScale, minScale);
            } else {
                this._view.scale.set(scale, scale);
            }

            if (this.anchor) {
                this._view.pivot.x = (this._view.width / this._view.scale.x) * this.anchor.x + this._view.getLocalBounds().x;
                this._view.pivot.y = (this._view.height / this._view.scale.y) * this.anchor.y + this._view.getLocalBounds().y;
            }
            if (this.position) {
                this._view.x = this.position.x * this._view.scale.x;
                this._view.y = this.position.y * this._view.scale.y;
            }
        }
    }

    public onApplyProperty(layout: any): void {
        super.onApplyProperty(layout);
        if (!isNullOrUndefined(layout.base)) {
            this.base = new Size(layout.base.width || 0, layout.base.height || 0);
        }

        if (!isNullOrUndefined(layout.maxScale)) {
            this.maxScale = layout.maxScale;
        }

        if (!isNullOrUndefined(layout.fitType)) {
            this.fitType = layout.fitType || GroupContainerType.FIT;
        }
    }
}