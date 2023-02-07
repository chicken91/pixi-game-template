import { LayoutParser } from "../factory/layout/parsers/LayoutParser";
import { EventDispatcher } from "./EventDispatcher";
import { bind, inject } from "../factory/di/inject";
import { IView } from "../views/IView";
import { Size } from "../models/data/Size";
import { ScreenModel } from "../models/ScreenModel";
import { CoreEvents } from "../types/CoreEvents";
import { RenderModel } from "../models/RenderModel";
import { CreationPriority } from "../factory/di/CreationPriority";

@bind({singleton: true, priority: CreationPriority.HIGH})
export class SceneService {
    protected layoutParser: LayoutParser = inject(LayoutParser);
    protected renderModel: RenderModel = inject(RenderModel);
    protected dispatcher: EventDispatcher = inject(EventDispatcher);
    protected screenModel: ScreenModel = inject(ScreenModel);

    protected scenes: { [sceneId: string]: IView } = {};

    constructor() {
        this.dispatcher.addListener(CoreEvents.ADD_SCENE, this.onSceneAdd.bind(this));
        this.dispatcher.addListener(CoreEvents.REMOVE_SCENE, this.onSceneRemove.bind(this));
        this.dispatcher.addListener(CoreEvents.RESIZE, this.onResize.bind(this));
    }

    protected onSceneAdd(sceneId: string): void {
        if (!this.scenes.hasOwnProperty(sceneId)) {
            const scene: IView = this.layoutParser.createFromLibrary(sceneId);
            this.scenes[sceneId] = scene;
            this.renderModel.scene.addChildAt(scene, 0);
            this.onResize(this.screenModel.size);
            this.dispatcher.dispatch(CoreEvents.SCENE_LOADED, sceneId);
        }
    }

    protected onSceneRemove(sceneId: string): void {
        if (this.scenes.hasOwnProperty(sceneId)) {
            const scene: IView = this.scenes[sceneId];
            this.renderModel.rootContainer.removeChild(scene);
            delete this.scenes[sceneId];
        }
    }

    protected onResize(size: Size): void {
        for (let child of this.renderModel.rootContainer.children) {
            (<IView>child).onResize(size.width, size.height);
        }
    }
}