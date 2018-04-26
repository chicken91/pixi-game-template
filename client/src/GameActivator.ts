import Application = PIXI.Application;
import {Context} from "./common/context/Context";

export class GameActivator {
    public static activate(): void {
        let context: Context = new Context(new Application({
            width: window.innerWidth,
            height: window.innerHeight,
            autoStart: false
        }));
        context.startGame();
    }
}