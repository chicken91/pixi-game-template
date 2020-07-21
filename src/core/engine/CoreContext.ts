import { IApplicationModule } from './modules/IApplicationModule';
import { Kernel } from "../injects/Kernel";
import { EventDispatcher } from "../components/events/EventDispatcher";
import { ApplicationModule } from "./modules/ApplicationModule";

export class CoreContext {
    private _isActivated: boolean;
    private _kernel: Kernel;
    private _modules: IApplicationModule[];

    constructor() {
        this._isActivated = false;
        this._modules = [];
        this._kernel = Kernel.getInstance();
        this.addBindings();
    }

    /**
     * When Context activating it activates kernel, which
     * enables the injections (only when kernel is activated we can inject classes),
     * Also runs method onActivation() in all binded modules
     */
    public activate(): void {
        if (this.isActivated) {
            throw new Error("Already activated context");
        }
        this._isActivated = true;

        this._kernel.activate();
        this._modules.forEach((item: IApplicationModule) => {
                item.onActivation();
            }
        );
        this._modules = [];
    }

    /**
     * Adding module to the _modules array to manage
     * @param module add injections
     */
    public addModule(module: ApplicationModule): void {
        this._modules.push(module);
    }

    /**
     * Adding bindings that are common and dont belong to any module
     */
    public addBindings(): void {
        this._kernel.bind(EventDispatcher).asSingleton();
    }

    public get isActivated(): boolean {
        return this._isActivated;
    }

    public get modules(): IApplicationModule[] {
        return this._modules;
    }

    public get kernel(): Kernel {
        return this._kernel;
    }
}