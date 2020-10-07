import { MainModule } from "./main/MainModule";
import { CoreLoader } from "../../core/src/engine/CoreLoader";
import { CoreContext } from "../../core/src/engine/CoreContext";

export class TemplateLoader extends CoreLoader {

    protected addModules(context: CoreContext): void {
        super.addModules(context);
        this.addModule(new MainModule(context));
    }
}