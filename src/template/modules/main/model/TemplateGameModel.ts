import { GameModel } from "../../../../core/engine/modules/game/model/GameModel";

export abstract class TemplateGameModel extends GameModel {
    private readonly TOTAL_GAME_TIME = 60 * 1000;
    private _autoplay: boolean = false;
    private _startGameTime: number = 0;

    public reset(): void {
        this._autoplay = false;
        this._startGameTime = 0;
    }

    public checkRemainingTime(): boolean {
        if (this._startGameTime === 0) {
            this._startGameTime = Date.now();
        }
        return Date.now() - this._startGameTime < this.TOTAL_GAME_TIME;
    }

    public get autoplay(): boolean {
        return this._autoplay;
    }

    public set autoplay(value: boolean) {
        this._autoplay = value;
    }
}