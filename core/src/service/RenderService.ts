import { bind, inject } from "../factory/di/inject";
import { CreationPriority } from "../factory/di/CreationPriority";
import { CoreEvents } from "../types/CoreEvents";
import { RenderModel } from "../models/RenderModel";
import { CoreConstants } from "../types/constant/CoreConstants";
import { EventDispatcher } from "./EventDispatcher";

@bind({singleton: true, priority: CreationPriority.VERY_HIGH})
export class RenderService {
    protected dispatcher: EventDispatcher = inject(EventDispatcher);
    protected renderModel: RenderModel = inject(RenderModel);

    constructor() {
        this.renderModel.createApplication();
        this.initCanvas();
        this.renderModel.createFPSMeter();
        this.initFocusListeners();
        this.onRender();
    }

    protected initFocusListeners(): void {
        window.addEventListener('focus', (event) => {
            this.dispatcher.dispatch(CoreEvents.RECOVER_GAME_FOCUS);
        });

        window.addEventListener('blur', (event) => {
            this.dispatcher.dispatch(CoreEvents.LOSE_GAME_FOCUS);
        });
    }

    public resizeCanvas(width: number, heigth: number) {
        this.renderModel.renderer.setSize(width, heigth);
        this.updateCanvasStyleDimension(width, heigth);
    }

    protected onRender() {
        requestAnimationFrame(this.onRender);
        this.renderModel.renderer.render( this.renderModel.scene, this.renderModel.camera );
        this.renderModel.updateFPSMeter();
        this.dispatcher.dispatch(CoreEvents.ON_RENDER);
    }

    protected initCanvas() {
        Object.assign(this.renderModel.canvas.style, CoreConstants.styles.game);

        // const gamePlayPanel = document.getElementById("game-div") as HTMLDivElement;
        // gamePlayPanel.appendChild(this.renderModel.canvas);

    }

    protected updateCanvasStyleDimension(width: number, heigth: number): void {
        this.renderModel.canvas.style.width = width.toString() + "px";
        this.renderModel.canvas.style.height = heigth.toString() + "px";
    }
}