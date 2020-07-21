import { BaseParser } from "../parsers/BaseParser";
import { BaseBuilder } from "./BaseBuilder";
import { IView } from "../../../../components/views/IView";
import { isNullOrUndefined } from "util";
import { GraphicsView } from "../../../../components/views/GraphicsView";

export class GraphicsBuilder extends BaseBuilder {

    protected createDefault(layout: any, layoutParser: BaseParser): IView {
        return new GraphicsView();
    }

    public applyAttributes(element: GraphicsView, layout: any, layoutParser: BaseParser): void {
        super.applyAttributes(element, layout, layoutParser);
        if (!isNullOrUndefined(layout.size) && !isNullOrUndefined(layout.color)) {
            if (layout.border) {
                if (layout.border.width && layout.border.color) {
                    const alpha = layout.border.alpha ? layout.border.alpha : 1;
                    element.widget.lineStyle(layout.border.width, layout.border.color, alpha);
                }
            }
            if (layout.rounded) {
                element.widget.beginFill(layout.color).drawRoundedRect(0, 0, layout.size.width, layout.size.height, layout.rounded.radius).endFill();
            } else {
                element.widget.beginFill(layout.color).drawRect(0, 0, layout.size.width, layout.size.height).endFill();
            }

            element.width = layout.size.width;
            element.height = layout.size.height;
        }
    }
}