import { IView } from './IView';
import { EventDispatcher } from "../service/EventDispatcher";
import { inject } from "../factory/di/inject";
import { Object3D } from "three";

export class Object3DView<T extends Object3D> implements IView {
    private _object3D: T;
    protected dispatcher: EventDispatcher = inject(EventDispatcher);

    constructor(object3D: T) {
        this._object3D = object3D;

        this._object3D.addEventListener("added", this.onAdded);
        this._object3D.addEventListener("removed", this.onRemoved);
    }

    public onAdded(): void {


    }

    public onRemoved(): void {
        this._object3D.removeEventListener("added", this.onAdded);
        this._object3D.removeEventListener("removed", this.onRemoved);
        this._object3D = undefined;
    }

    public onResize(width?: number, height?: number): void {

    }

    public get object3D(): T {
        return this._object3D;
    }
}