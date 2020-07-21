import Graphics = PIXI.Graphics;
import Bounds = PIXI.Bounds;

export class ResizeArea extends Graphics {

    public get bounds(): Bounds {
        return this._bounds;
    }
}