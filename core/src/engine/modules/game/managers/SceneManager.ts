import { LayoutParser } from "../../layout/parsers/LayoutParser";
import { EventDispatcher } from "../../../../components/events/EventDispatcher";
import { inject } from "../../../../injects/inject";
import { IView } from "../../../../components/views/IView";
import { Size } from "../../screen/instance/Size";
import { ScreenModel } from "../../screen/model/ScreenModel";
import { CoreEvents } from "../../CoreEvents";
import { RenderModel } from "../../screen/model/RenderModel";

export class SceneManager {
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
            this.renderModel.rootContainer.addChildAt(scene, 0);
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