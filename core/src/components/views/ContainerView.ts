import { DisplayObject } from 'pixi.js';
import { IView } from './IView';
import { AbstractView } from "./AbstractView";
import { ResizeAreaView } from "./ResizeAreaView";

export class ContainerView extends AbstractView {
    public resizeArea!: ResizeAreaView;

    public onResize(width?: number, height?: number): void {
        this.children.forEach((value: DisplayObject, index: number, array: DisplayObject[]) => {
            const child = value as IView;
            if (child.onResize) {
                child.onResize(width, height);
            }
        });
        super.onResize(width, height);
    }

    public calculateBounds(): void {
        if (this.resizeArea) {
            this._bounds.clear();
            this.resizeArea.getBounds();
            this._bounds.addBounds(this.resizeArea.widget.bounds);
        } else {
            super.calculateBounds();
        }
    }
}