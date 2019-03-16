import Application = PIXI.Application;
import {EventDispatcher} from "../common/dispatcher/EventDispatcher";
import {Global} from "../common/global/Global";
import {RenderManager} from "../common/managers/RenderManager";
import {StageView} from "./view/StageView";
import {BaseView} from "../common/components/BaseView";
import {EventType} from "../common/type/EventType";
import {GameData} from "./data/GameData";
import {ResizeService} from "./service/ResizeService";
import {SizeData} from "./data/size/SizeData";
import {LoadController} from "./controller/load/LoadController";
import {ReelController} from "./controller/reel/ReelController";

export class GameContext {
    private _application: Application;

    constructor() {
        this.initApplication();
        this.initGame();
    }

    public startGame() {
        this._application.start();
        Global.dispatcher.dispatch(EventType.ON_CONTEXT_INIT);
    }

    private initApplication() {
        this._application = new Application({
            width: SizeData.GAME_WIDTH,
            height: SizeData.GAME_HEIGHT,
            autoStart: false,
            autoResize: true,
            transparent: false,
            backgroundColor: 0x000000,
            resolution: window.devicePixelRatio
        });
    }

    private initGame() {
        Global.dispatcher = new EventDispatcher();
        Global.data = new GameData();
        Global.renderManager = new RenderManager(this._application.renderer);

        let unitList = [
            ResizeService,
            LoadController,
            ReelController
        ];
        for (let unit of unitList) {
            let unitObject = new unit();
            unitObject.setup();
        }

        BaseView.initialize(StageView, this._application.stage);
    }
}