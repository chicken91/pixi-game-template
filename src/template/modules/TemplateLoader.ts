import { MainModule } from "./main/MainModule";
import { CoreLoader } from "../../core/engine/CoreLoader";
import { CoreContext } from "../../core/engine/CoreContext";
import { TemplateStateMachineModule } from "./stateMachine/TemplateStateMachineModule";
import { BoyModule } from "./boy/BoyModule";
import { AutoPlayModule } from "./autoPlay/AutoPlayModule";

export class TemplateLoader extends CoreLoader {

    protected addModules(context: CoreContext): void {
        super.addModules(context);
        this.addModule(new TemplateStateMachineModule(context));
        this.addModule(new MainModule(context));
        this.addModule(new BoyModule(context));
        this.addModule(new AutoPlayModule(context));
    }
}