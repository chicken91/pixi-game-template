import Application = PIXI.Application;
import {EventDispatcher} from "../dispatcher/EventDispatcher";
import {Global} from "../global/Global";
import {RenderManager} from "../managers/RenderManager";
import {MainScreenView} from "../../game/view/MainScreenView";
import {BaseView} from "../components/BaseView";
import {EventType} from "../type/EventType";

export class Context {
    private _dispatcher: EventDispatcher = new EventDispatcher();
    private _application: Application;

    constructor(application: Application) {
        this._application = application;
        this._dispatcher = new EventDispatcher();
        this.init();
    }

    public startGame() {
        this._application.start();
        this._dispatcher.dispatch(EventType.START_GAME);
    }

    private init() {
        Global.renderManager = new RenderManager(this._application.view, this._dispatcher);

        BaseView.initialize(MainScreenView, this._dispatcher, this._application.stage);
    }
}