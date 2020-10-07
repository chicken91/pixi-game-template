import { Container } from "pixi.js";
import { ResizePropertyGroup } from "./resizeProperty/ResizePropertyGroup";
import { AbstractController } from "../controllers/AbstractController";
import { IResizeProperty } from "./resizeProperty/IResizeProperty";

export interface IView extends Container {
    controller: AbstractController | undefined;
    resizePropertyGroup: ResizePropertyGroup;

    onAdded(): void;

    onRemoved(): void;

    setController(controller: AbstractController): void;

    onResize(width?: number, height?: number): void;

    onActivate(width?: number, height?: number): void;

    createResizeProperty(): IResizeProperty;
}