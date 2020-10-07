import { Injection } from "./Injection";
import { ViewBindingMap } from "./ViewBindingMap";
import { ControllerBindingMap } from "./ControllerBindingMap";
import { IServerModel } from "../components/models/IServerModel";
import { InjectionUtils } from "./InjectionUtils";

/**
 * @class Kernel
 * Contains all injection maps
 * Contains functionality for binding:
 *          single class,
 *          view class to layout id,
 *          controller class to view.
 */
export class Kernel {
    private static _instance: Kernel;
    // single class map
    private _injectionMap: { [constructorName: string]: Injection } = {};
    // controller to view class map
    private _controllerMap: ControllerBindingMap = new ControllerBindingMap();
    // view to layout id class map
    private _viewMap: ViewBindingMap = new ViewBindingMap();
    // flag that we have to check before create binding class object,
    // it can create object only after initialize all classes binding
    private _activate = false;

    public static getInstance(): Kernel {
        if (!this._instance) {
            this._instance = new Kernel();
        }
        return this._instance;
    }

    public activate(): void {
        this._activate = true;
        this.activateForceInjections();
    }

    public bind(constructor: Function): Injection {

        let injection = this.getInjection(constructor);
        if (!injection) {
            injection = new Injection(constructor);
            this.addInjection(constructor, injection);
        }
        return injection;
    }

    public getServerModels(): Array<IServerModel> {
        let serverModelList: Array<IServerModel> = [];
        let keyList: Array<string> = Object.keys(this._injectionMap);
        for (let key of keyList) {
            let injection: Injection = this._injectionMap[key];
            if (injection.isServerModel()) {
                serverModelList.push(injection.getInstance());
            }
        }
        return serverModelList;
    }

    public getBind(constructor: Function): any {
        this.checkActivation();

        const injection = this.getInjection(constructor);
        if (!injection) {
            throw new Error("There is no any binding for " + constructor + " please bind the class before inject()");
        }
        return injection.getInstance();
    }

    public bindView(view: any): ViewBindingMap {
        return this._viewMap.bindView(view);
    }

    public bindController(controller: Function): ControllerBindingMap {
        return this._controllerMap.bindController(controller);
    }

    private checkActivation(): void {
        if (!this._activate) {
            throw new Error("You try to use Kernel before activation!");
        }
    }

    private addInjection(constructor: any, injection: Injection): void {
        const uniqueId = InjectionUtils.getUniqueAttributeId(constructor);
        this._injectionMap[uniqueId] = injection;
    }

    private getInjection(constructor: Function): Injection {
        if (!constructor) {
            throw Error("you are trying to get undefined constructor");
        }
        const uniqueId = InjectionUtils.getUniqueAttributeId(constructor);
        return this._injectionMap[uniqueId];
    }

    private activateForceInjections(): void {
        for (let constructorName in this._injectionMap) {
            if (constructorName) {
                let injection: Injection = this._injectionMap[constructorName];
                if (injection.isForceCreation()) {
                    injection.getInstance();
                }
            }
        }
    }

    public get controllerMap(): ControllerBindingMap {
        return this._controllerMap;
    }

    public get viewMap(): ViewBindingMap {
        return this._viewMap;
    }
}
