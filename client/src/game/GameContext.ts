import Application = PIXI.Application;
import {EventDispatcher} from "../common/dispatcher/EventDispatcher";
import {Global} from "../common/global/Global";
import {RenderManager} from "../common/managers/RenderManager";
import {MainView} from "./view/MainView";
import {BaseView} from "../common/components/BaseView";
import {EventType} from "../common/type/EventType";
import {GameData} from "./data/GameData";
import {ResizeService} from "./service/ResizeService";
import {SizeData} from "./data/size/SizeData";

export class GameContext {
    private _application: Application;

    constructor() {
        this.initApplication();
        this.initGame();
    }

    public startGame() {
        this._application.start();
        Global.dispatcher.dispatch(EventType.START_GAME);
    }

    private initApplication() {
        this._application = new Application({
            width: SizeData.GAME_WIDTH,
            height: SizeData.GAME_HEIGHT,
            autoStart: false,
            autoResize: true,
            transparent: false,
            backgroundColor: 0x061639,
            resolution: window.devicePixelRatio
        });
    }

    private initGame() {
        Global.dispatcher =  new EventDispatcher();
        Global.data =  new GameData();
        Global.renderManager = new RenderManager(this._application.renderer);

        let serviceDataList = [
            {service: ResizeService, parameters: this._application.stage}
        ];
        for (let serviceData of serviceDataList) {
            let service = new serviceData.service();
            service.setup();
        }

        BaseView.initialize(MainView, this._application.stage);
    }
}