import {EventDispatcher, ListenerCallback} from "../dispatcher/EventDispatcher";
import {GameData} from "../../game/data/GameData";
import {Global} from "../global/Global";

export abstract class Unit {
    private _dispatcher: EventDispatcher;
    private _data: GameData;

    constructor() {
        this._dispatcher = Global.dispatcher;
        this._data = Global.data;
    }

    public setup(parameters?: any): Unit {
        return this;
    }

    protected addListener(message: string, listenerCallback: ListenerCallback) {
        this._dispatcher.addListener(message, listenerCallback)
    }

    protected fireEvent(message: string, arg?: any) {
        this._dispatcher.dispatch(message, arg)
    }

    get data(): GameData {
        return this._data;
    }

    get dispatcher(): EventDispatcher {
        return this._dispatcher;
    }
}