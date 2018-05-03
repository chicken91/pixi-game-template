import Point = PIXI.Point;

export class SizeData {
    public static readonly GAME_WIDTH: number = 1320;
    public static readonly GAME_HEIGHT: number = 700;
    public readonly gameRatio: number = SizeData.GAME_WIDTH / SizeData.GAME_HEIGHT;

    public screenSize: Point = new Point(0, 0);
    public scale: number = 1;


}