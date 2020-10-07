import { Application, Container, Renderer } from "pixi.js";
import { UrlUtils } from '../../game/utils/UrlUtils';
import { CoreConstants } from '../../CoreConstants';
import MIPMAP_MODES = PIXI.MIPMAP_MODES;

export class RenderModel {
    protected _application!: Application;
    protected _fpsMeter!: FPSMeter;

    public createApplication(): void {
        PIXI.settings.MIPMAP_TEXTURES = MIPMAP_MODES.OFF;
        PIXI.settings.FILTER_RESOLUTION = window.devicePixelRatio;
        const options = {resolution: window.devicePixelRatio};
        this._application = new Application(options);
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

    public get renderer(): Renderer {
        return this._application.renderer;
    }

    public get canvas(): HTMLCanvasElement {
        return this._application.renderer.view;
    }

    public get rootContainer(): Container {
        return this._application.stage;
    }
}