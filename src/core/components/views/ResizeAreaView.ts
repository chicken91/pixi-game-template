import { WidgetView } from "./WidgetView";
import { ResizeArea } from "./widget/ResizeArea";

export class ResizeAreaView extends WidgetView<ResizeArea> {

    constructor() {
        super(new ResizeArea());
    }
}