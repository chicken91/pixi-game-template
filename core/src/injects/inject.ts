import { Kernel } from "./Kernel";
import { IServerModel } from "../components/models/IServerModel";

/**
 * Inject method gets binding from the map we created
 * @param constructor base binded class that we want to get
 */
export function inject(constructor: Function): any {
    return Kernel.getInstance().getBind(constructor);
}

/**
 * get biew binding by the id
 * @param id of view from layout
 */
export function getViewClass(id: string): Function {
    return Kernel.getInstance().viewMap.getView(id);
}

/**
 * get all model which binding as server model
 */
export function getServerModels(): Array<IServerModel> {
    return Kernel.getInstance().getServerModels();
}