import {RenderManager} from "../managers/RenderManager";
import {EventDispatcher} from "../dispatcher/EventDispatcher";
import {GameData} from "../../game/data/GameData";
import Application = PIXI.Application;

export class Global {
    public static dispatcher: EventDispatcher;
    public static data: GameData;

    public static renderManager: RenderManager;

}