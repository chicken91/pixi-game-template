import { CoreEvents } from "../../core/src/types/CoreEvents";
import { viewMapping } from "../../core/src/factory/di/inject";
import { Object3DView } from "../../core/src/views/Object3DView";
import { Camera, Scene } from "three";
import { SceneView } from "../../core/src/views/SceneView";
import { PerspectiveCameraView } from "../../core/src/views/PerspectiveCameraView";

@viewMapping('gameSceneView')
export class GameSceneView extends SceneView {
    public camera: PerspectiveCameraView;


}