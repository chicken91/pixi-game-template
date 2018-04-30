import {GameContext} from "./game/GameContext";

export class GameActivator {
    public static activate(): void {
        let context: GameContext = new GameContext();
        context.startGame();
    }
}