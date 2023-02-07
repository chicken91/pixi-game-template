import { Camera, Scene } from "three";
import { Object3DView } from "./Object3DView";

export class SceneView extends Object3DView<Scene> {
    public camera: Object3DView<Camera>;


}