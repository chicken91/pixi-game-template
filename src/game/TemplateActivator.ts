import { TemplateLoader } from "./TemplateLoader";
import { CoreActivator } from "../../core/src/engine/CoreActivator";
import { CoreContext } from "../../core/src/engine/CoreContext";
import { CoreLoader } from "../../core/src/engine/CoreLoader";

export class TemplateActivator extends CoreActivator {
    protected getLoader(context: CoreContext): CoreLoader {
        return new TemplateLoader(context);
    }
}