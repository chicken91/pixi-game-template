import SkeletonData = PIXI.spine.core.SkeletonData;

export class SpineModel {
    private _dataMap: { [key: string]: SkeletonData } = {};

    public addSpineData(spineId: string, spineData: SkeletonData): void {
        this._dataMap[spineId] = spineData;
    }

    public getSpineDataById(spineId: string): SkeletonData {
        return this._dataMap[spineId];
    }
}