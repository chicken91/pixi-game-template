import { TemplateLoader } from "./modules/TemplateLoader";
import { CoreActivator } from "../core/engine/CoreActivator";
import { CoreContext } from "../core/engine/CoreContext";
import { CoreLoader } from "../core/engine/CoreLoader";

export class TemplateActivator extends CoreActivator {
    protected getLoader(context: CoreContext): CoreLoader {
        return new TemplateLoader(context);
    }
}