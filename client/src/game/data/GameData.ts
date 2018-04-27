import {SizeData} from "./size/SizeData";

export class GameData {
    private _sizeData: SizeData = new SizeData();


    get sizeData(): SizeData {
        return this._sizeData;
    }
}