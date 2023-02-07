import * as THREE from "three";
import { Camera, Scene, WebGLRenderer } from "three";
import { bind } from "../factory/di/inject";
import { UrlUtils } from "../utils/UrlUtils";
import { CoreConstants } from "../types/constant/CoreConstants";

@bind({singleton: true})
export class RenderModel {
    protected _fpsMeter!: FPSMeter;
    protected _renderer!: WebGLRenderer;
    private _scene!: Scene;

    public createApplication(): void {
        this._renderer = new THREE.WebGLRenderer();
        this._renderer.setPixelRatio(window.devicePixelRatio);
        this._renderer.setSize(window.innerWidth, window.innerHeight);

        const gamePlayPanel = document.getElementById("game-div") as HTMLDivElement;
        gamePlayPanel.appendChild(this._renderer.domElement);
    }

    public createFPSMeter(): void {
        if (__DEV__ && UrlUtils.getParameter(CoreConstants.urlParameters.debug) === "1") {
            this._fpsMeter = new FPSMeter();
        }
    }

    public updateFPSMeter(): void {
        if (this._fpsMeter) {
            this._fpsMeter.tick();
        }
    }

    public get renderer(): WebGLRenderer {
        return this._renderer;
    }

    public get canvas(): HTMLCanvasElement {
        return this._renderer.domElement;
    }

    public get scene(): Scene {
        return this._scene;
    }

    public set scene(value: Scene) {
        this._scene = value;
    }
}