import Container = PIXI.Container;
import {EventDispatcher} from "../dispatcher/EventDispatcher";
import {Unit} from "./Unit";
import {GameData} from "../../game/data/GameData";
import {isNullOrUndefined} from "util";

export abstract class BaseView extends Unit {
    private _view: Container;

    constructor(dispatcher: EventDispatcher, data: GameData, view?: Container) {
        super(dispatcher, data);
        this._view = view ? view : new Container();
    }

    public static initialize(entryViewType: new (dispatcher: EventDispatcher, data: GameData, view: Container) => BaseView, dispatcher: EventDispatcher, data: GameData, initView: Container) {
        let entryView: BaseView = new entryViewType(dispatcher, data, initView);
        entryView.setup(null);
    }

    public setup(parent: Container): BaseView {
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

    get view(): Container {
        return this._view;
    }
}