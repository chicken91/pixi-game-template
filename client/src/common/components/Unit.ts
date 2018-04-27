import {BaseView} from "./BaseView";
import {EventDispatcher, ListenerCallback} from "../dispatcher/EventDispatcher";
import {GameData} from "../../game/data/GameData";

export abstract class Unit {
    private _dispatcher: EventDispatcher;
    private _data: GameData;

    constructor(dispatcher: EventDispatcher, data: GameData) {
        this._dispatcher = dispatcher;
        this._data = data;
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
}