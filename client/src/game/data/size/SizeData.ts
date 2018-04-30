import Point = PIXI.Point;

export class SizeData {
    public readonly gameWidth: number = 1320;
    public readonly gameHeight: number = 700;
    public readonly gameRatio: number = this.gameWidth / this.gameHeight;

    public screenSize: Point = new Point(0, 0);
    public screenFactor: Point = new Point(0, 0);
    public scale: number = 1;


}