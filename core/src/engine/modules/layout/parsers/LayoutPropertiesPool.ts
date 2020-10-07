import { IView } from "../../../../components/views/IView";
import { isNullOrUndefined } from "util";

export class LayoutPropertiesPool {
    private _treePropertiesPool: { [property: string]: number } = {};

    public addProperties(layout: any): void {
        for (const prop in layout.props) {
            if (layout.props.hasOwnProperty(prop) && !isNullOrUndefined(layout.props[prop])) {
                this._treePropertiesPool[prop] = layout.props[prop];
            }
        }
    }

    public applyProperties(element: IView, layout: any): void {
        for (const prop in this._treePropertiesPool) {
            if (prop && !isNullOrUndefined(this._treePropertiesPool[prop])) {
                element[prop] = this._treePropertiesPool[prop];
            }
        }
    }

    public removeProperties(layout: any): void {
        for (const prop in layout.props) {
            if (!isNullOrUndefined(this._treePropertiesPool[prop])) {
                delete this._treePropertiesPool[prop];
            }
        }
    }
}