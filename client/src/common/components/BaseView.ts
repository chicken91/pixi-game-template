import Container = PIXI.Container;
import {EventDispatcher, ListenerCallback} from "../dispatcher/EventDispatcher";

export abstract class BaseView {
    private _view: Container;
    private _dispatcher: EventDispatcher;

    constructor() {
        this._view = new Container();
    }

    public static initialize(entryViewType: new () => BaseView, dispatcher: EventDispatcher, parent: Container) {
        let entryView: BaseView = new entryViewType();
        entryView.setup(dispatcher, parent);
    }

    public setup(dispatcher: EventDispatcher, parent?: Container): BaseView {
        this._dispatcher = dispatcher;
        parent && parent.addChild(this._view);
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

    protected addListener(message: string, listenerCallback: ListenerCallback) {
        this._dispatcher.addListener(message, listenerCallback)
    }

    protected fireEvent(message: string, ...args: Array<any>) {
        this._dispatcher.dispatch(message, args)
    }

    get view(): Container {
        return this._view;
    }
}