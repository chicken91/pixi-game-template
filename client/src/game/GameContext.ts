import Application = PIXI.Application;
import {EventDispatcher} from "../common/dispatcher/EventDispatcher";
import {Global} from "../common/global/Global";
import {RenderManager} from "../common/managers/RenderManager";
import {MainScreenView} from "./view/MainScreenView";
import {BaseView} from "../common/components/BaseView";
import {EventType} from "../common/type/EventType";
import {GameData} from "./data/GameData";
import {ResizeService} from "./service/ResizeService";
import {Unit} from "../common/components/Unit";

export class GameContext {
    private _dispatcher: EventDispatcher = new EventDispatcher();
    private _data: GameData = new GameData();
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
        Global.renderManager = new RenderManager(this._application.renderer, this._dispatcher);

        let services = [ResizeService];
        for (let service of services) {
            new service(this._dispatcher, this._data).setup(this._application.stage);
        }

        BaseView.initialize(MainScreenView, this._dispatcher, this._data, this._application.stage);
    }
}