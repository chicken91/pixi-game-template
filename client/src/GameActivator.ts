import Application = PIXI.Application;
import {GameContext} from "./game/GameContext";

export class GameActivator {
    public static activate(): void {
        let context: GameContext = new GameContext(new Application({
            width: window.innerWidth,
            height: window.innerHeight,
            autoStart: false,
            autoResize: true
        }));
        context.startGame();
    }
}