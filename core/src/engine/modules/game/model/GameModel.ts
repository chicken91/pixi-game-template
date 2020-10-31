import { GameConfig } from "../config/GameConfig";
import { AbstractModel } from "../../../../components/models/AbstractModel";
import { bind } from "../../../../injects/inject";

@bind({singleton: true})
export abstract class GameModel extends AbstractModel {
    protected _gameConfig!: GameConfig;

    public initialize(gameConfig: GameConfig): void {
        this._gameConfig = gameConfig;
    }

    public getGameConfig(): GameConfig {
        return this._gameConfig;
    }
}