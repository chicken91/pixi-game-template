import { WidgetView } from "./WidgetView";
import Graphics = PIXI.Graphics;

export class GraphicsView extends WidgetView<Graphics> {

    constructor() {
        super(new Graphics());
    }
}