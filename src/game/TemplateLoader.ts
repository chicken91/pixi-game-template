import { CoreLoader } from "../../core/src/engine/CoreLoader";
import { MainView } from "./main/views/MainView";

export class TemplateLoader extends CoreLoader {

    protected getBindedClasses(): Array<Function> {
        const bindedClasses = super.getBindedClasses();
        bindedClasses.push(...[]);
        return bindedClasses;
    }

    protected getViewMappingClasses(): Array<Function> {
        const bindedClasses = super.getViewMappingClasses();
        bindedClasses.push(...[
            MainView
        ]);
        return bindedClasses;
    }
}