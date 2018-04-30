import Application = PIXI.Application;
import {EventDispatcher} from "../common/dispatcher/EventDispatcher";
import {Global} from "../common/global/Global";
import {RenderManager} from "../common/managers/RenderManager";
import {MainScreenView} from "./view/MainScreenView";
import {BaseView} from "../common/components/BaseView";
import {EventType} from "../common/type/EventType";
import {GameData} from "./data/GameData";
import {ResizeService} from "./service/ResizeService";

export class GameContext {
    private _dispatcher: EventDispatcher = new EventDispatcher();
    private _data: GameData = new GameData();
    private _application: Application;

    constructor() {
        this._dispatcher = new EventDispatcher();
        this.initApplication();
        this.initGame();
    }

    public startGame() {
        this._application.start();
        this._dispatcher.dispatch(EventType.START_GAME);
    }

    private initApplication() {
        this._application = new Application({
            width: this._data.sizeData.gameWidth,
            height: this._data.sizeData.gameHeight,
            autoStart: false,
            autoResize: true,
            transparent: false,
            backgroundColor: 0x061639,
            resolution: window.devicePixelRatio
        });
    }

    private initGame() {
        Global.renderManager = new RenderManager(this._application.renderer, this._dispatcher);

        let serviceDataList = [
            {service: ResizeService, parameters: this._application.stage}
        ];
        for (let serviceData of serviceDataList) {
            let service = new serviceData.service(this._dispatcher, this._data);
            service.setup(serviceData.parameters);
        }

        BaseView.initialize(MainScreenView, this._dispatcher, this._data, this._application.stage);
    }
}