/**
 * Class which contains binding view maps
 */

export class ViewBindingMap {
    // view map
    private _views: { [id: string]: Function } = {};
    // last view binding constructor
    private _viewConstructor!: Function;

    public bindView(view: any): ViewBindingMap {
        this._viewConstructor = view;
        return this;
    }

    public toId(id: string): void {
        this._views[id] = this._viewConstructor;
    }

    public getView(id: string): Function {
        return this._views[id];
    }
}
