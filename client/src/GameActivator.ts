import Application = PIXI.Application;
import Text = PIXI.Text;

export class GameActivator {
    public static activate(): void {
        let gameApplication: Application = new Application(window.innerWidth, window.innerHeight);
        Object.assign(gameApplication.view.style, {
            position: "fixed",
            top: 0,
            left: 0,
            background: "#bde6eb"
        });
        document.body.appendChild(gameApplication.view);
        gameApplication.stage.addChild(new Text('Hello World!', {fill: "#ffff61"}));
    }
}