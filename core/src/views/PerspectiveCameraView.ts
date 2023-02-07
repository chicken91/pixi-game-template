import { Camera, PerspectiveCamera, Scene } from "three";
import { Object3DView } from "./Object3DView";

export class PerspectiveCameraView extends Object3DView<PerspectiveCamera> {

    public onAdded(): void {

    }

    public onResize(width?: number, height?: number): void {

    }
}