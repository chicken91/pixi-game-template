import { CoreContext } from "../CoreContext";
import { Kernel } from "../../injects/Kernel";
import { IApplicationModule } from "./IApplicationModule";


export abstract class ApplicationModule implements IApplicationModule {
    protected context: CoreContext;

    constructor(context: CoreContext) {
        this.context = context;
        this.addInjections(context.kernel);
    }

    /**
     * Runs after kernel activated
     */
    public onActivation(): void {
        if (__DEV__) {
            console.log(this.constructor.name + ' -> Activated');
        }
    }

    /**
     * All modules must implement addInjections method
     * to define all bindings in the module
     * @param kernel - global kernel
     */
    protected abstract addInjections(kernel: Kernel): void;
}
