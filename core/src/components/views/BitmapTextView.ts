import { WidgetView } from "./WidgetView";
import BitmapText = PIXI.BitmapText;

export class BitmapTextView extends WidgetView<BitmapText> {

    constructor(text: string, style?: any) {
        super(new BitmapText(text, style));
    }
}