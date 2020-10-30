import { Container } from "pixi.js";
import { SizeDelegator } from "./resizeProperty/SizeDelegator";
import { IResizeProperty } from "./resizeProperty/IResizeProperty";

export interface IView extends Container {
    readonly sizeDelegator: SizeDelegator;

    onAdded(): void;

    onRemoved(): void;

    onResize(width?: number, height?: number): void;

    onActivate(width?: number, height?: number): void;

    createResizeProperty(): IResizeProperty;
}