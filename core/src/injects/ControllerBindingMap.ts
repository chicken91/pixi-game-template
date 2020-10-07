import { AbstractController } from "../components/controllers/AbstractController";
import { IView } from "../components/views/IView";
import { isNullOrUndefined } from "util";
import { InjectionUtils } from "./InjectionUtils";

/**
 * Map class which contains view and controller maps
 */
export class ControllerBindingMap {
    // view constructor to controller constructor map
    private _viewToControllerMap: { [viewConstructorName: string]: Function } = {};
    // last controller binding constructor
    private _controllerConstructor!: Function;

    public bindController(controller: Function): ControllerBindingMap {
        this._controllerConstructor = controller;
        return this;
    }

    public toView(viewConstructor: Function): void {
        const uniqueId = InjectionUtils.getUniqueAttributeId(viewConstructor);
        this._viewToControllerMap[uniqueId] = this._controllerConstructor;
    }

    public createController(viewConstructor: Function, view: IView): void {
        const uniqueId = InjectionUtils.getUniqueAttributeId(viewConstructor);
        let controllerConstructor: any = this._viewToControllerMap[uniqueId];
        if (!isNullOrUndefined(controllerConstructor)) {
            const controller = new controllerConstructor();
            (controller as AbstractController).setView(view);
            view.setController(controller);
        }
    }
}
