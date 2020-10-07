import { WidgetView } from "./WidgetView";
import Sprite = PIXI.Sprite;
import Texture = PIXI.Texture;

export class ImageView extends WidgetView<Sprite> {
    constructor(texture?: Texture) {
        super(new Sprite(texture));
    }
}