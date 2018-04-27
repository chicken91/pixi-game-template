import Container = PIXI.Container;
import {EventDispatcher, ListenerCallback} from "../dispatcher/EventDispatcher";
import {Unit} from "./Unit";
import {GameData} from "../../game/data/GameData";

export abstract class BaseView extends Unit {
    private _view: Container;

    constructor(dispatcher: EventDispatcher, data: GameData) {
        super(dispatcher, data);
        this._view = new Container();
    }

    public static initialize(entryViewType: new (dispatcher: EventDispatcher, data: GameData) => BaseView, dispatcher: EventDispatcher, data: GameData, parent: Container) {
        let entryView: BaseView = new entryViewType(dispatcher, data);
        entryView.setup(parent);
    }

    public setup(parent: Container): BaseView {
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

    get view(): Container {
        return this._view;
    }
}