import { GameConfig } from "../config/GameConfig";
import { AbstractServerModel } from "../../server/models/AbstractServerModel";
import { ExtendedResponse } from "../../CoreTypes";

export abstract class GameModel extends AbstractServerModel {
    protected _gameConfig!: GameConfig;

    public fetchResponseData(response: ExtendedResponse): void {

    }

    public initialize(gameConfig: GameConfig): void {
        this._gameConfig = gameConfig;
    }

    public getGameConfig(): GameConfig {
        return this._gameConfig;
    }
}