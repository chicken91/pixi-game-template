import Point = PIXI.Point;
import {SizeData} from "../size/SizeData";

export class ReelData {
    private _position: Point = new Point(0, 0);
    private _delta: Point = new Point(0, 0);
    private _touchDelta: Point = new Point(0, 0);
    private _radius: number = 20;

    public updatePosition() {
        if (this._position.x > SizeData.GAME_WIDTH || this._position.x < 0) {
            this._delta.x *= -1;
        }

        if (this._position.y > SizeData.GAME_HEIGHT || this._position.y < 0) {
            this._delta.y *= -1;
        }
        this._position.x += this._delta.x + this._touchDelta.x;
        this._position.y += this._delta.y + this._touchDelta.y;
    }

    public calculateTouchDelta(touch: Point) {

    }

    get position(): PIXI.Point {
        return this._position;
    }

    get delta(): PIXI.Point {
        return this._delta;
    }

    get touchDelta(): PIXI.Point {
        return this._touchDelta;
    }

    get radius(): number {
        return this._radius;
    }
}