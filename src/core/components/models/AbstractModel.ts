import { EventEmitter, ListenerFn } from "eventemitter3";

/**
 * @class AbstractServerModel
 *
 * Base server model class
 */
export abstract class AbstractModel extends EventEmitter {

    public observeProperty(propertyKey: string, callBack: ListenerFn, context?: any): void {
        this.on(propertyKey, callBack, context);
    }

    public removeObservers(propertyKey: string, observer: ListenerFn | undefined, context?: any): void {
        this.off(propertyKey, observer, context);
    }

    public sendProperty(propertyKey: string, value: any): void {
        this.emit(propertyKey, value);
    }
}