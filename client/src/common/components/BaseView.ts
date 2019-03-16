import Container = PIXI.Container;
import {Unit} from "./Unit";
import {isNullOrUndefined} from "util";

export abstract class BaseView extends Unit {
    protected _view: Container;

    constructor(view?: Container) {
        super();
        this._view = view ? view : new Container();
    }

    public static initialize(entryViewType: new (view: Container) => BaseView, initView: Container) {
        let entryView: BaseView = new entryViewType(initView);
        entryView.setup();
    }

    public setup(parent?: Container): BaseView {
        !isNullOrUndefined(parent) && parent.addChild(this._view);
        this.setupChildren(this._view);
        this.addListeners();
        return this;
    }

    protected setupChildren(parent: Container) {

    }

    protected addListeners() {

    }

    protected addChild(child: BaseView) {
        this._view.addChild(child._view);
    }

    protected addChildAt(child: BaseView, index: number) {
        this._view.addChildAt(child._view, index);
    }

    public view(): Container {
        return this._view;
    }
}