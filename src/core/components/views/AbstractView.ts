import { Container, Graphics } from 'pixi.js';
import { createController } from '../../injects/inject';
import { IView } from './IView';
import { ResizePropertyGroup } from "./resizeProperty/ResizePropertyGroup";
import { AbstractController } from "../controllers/AbstractController";
import { IResizeProperty } from "./resizeProperty/IResizeProperty";
import { ResizeProperty } from "./resizeProperty/ResizeProperty";
import { ResizePropertyType } from "../types/ResizePropertyType";

export abstract class AbstractView extends Container implements IView {
    public resizePropertyGroup: ResizePropertyGroup = new ResizePropertyGroup();
    public controller!: AbstractController | undefined;

    constructor() {
        super();
        this.on("added", this.onAdded);
        this.on("removed", this.onRemoved);
        this.resizePropertyGroup.addResizeProperty(ResizePropertyType.DEFAULT, this.createResizeProperty());
    }

    public onAdded(): void {
        createController(this.constructor, this);
    }

    public onRemoved(): void {
        if (this.controller) {
            this.controller.destroy();
        }
        this.controller = undefined;
    }

    public setController(controller: AbstractController): void {
        this.controller = controller;
    }

    public onResize(width?: number, height?: number): void {
        this.resizePropertyGroup.onResize(width, height);
    }

    public onActivate(width?: number, height?: number): void {
        this.resizePropertyGroup.onActivate();
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
}