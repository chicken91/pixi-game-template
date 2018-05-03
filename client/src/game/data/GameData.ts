import {SizeData} from "./size/SizeData";
import {BallData} from "./ball/BallData";

export class GameData {
    private _size: SizeData = new SizeData();
    private _ball: BallData = new BallData();

    get size(): SizeData {
        return this._size;
    }

    get ball(): BallData {
        return this._ball;
    }
}