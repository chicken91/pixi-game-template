import { CoreLoader } from "../core/src/CoreLoader";
import { GameSceneView } from "./views/GameSceneView";

export class TemplateLoader extends CoreLoader {

    protected getBindedClasses(): Array<Function> {
        const bindedClasses = super.getBindedClasses();
        bindedClasses.push(...[]);
        return bindedClasses;
    }

    protected getViewMappingClasses(): Array<Function> {
        const bindedClasses = super.getViewMappingClasses();
        bindedClasses.push(...[
            GameSceneView
        ]);
        return bindedClasses;
    }
}