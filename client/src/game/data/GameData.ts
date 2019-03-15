import {SizeData} from "./size/SizeData";
import {ReelData} from "./reel/ReelData";

export class GameData {
    private _size: SizeData = new SizeData();
    private _reel: ReelData = new ReelData();

    get size(): SizeData {
        return this._size;
    }

    get reel(): ReelData {
        return this._reel;
    }
}