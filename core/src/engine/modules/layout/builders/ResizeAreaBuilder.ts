import { BaseParser } from "../parsers/BaseParser";
import { BaseBuilder } from "./BaseBuilder";
import { IView } from "../../../../components/views/IView";
import { isNullOrUndefined } from "util";
import { ResizeAreaView } from "../../../../components/views/ResizeAreaView";

export class ResizeAreaBuilder extends BaseBuilder {

    protected createDefault(layout: any, layoutParser: BaseParser): IView {
        return new ResizeAreaView();
    }

    public applyAttributes(element: ResizeAreaView, layout: any, layoutParser: BaseParser): void {
        super.applyAttributes(element, layout, layoutParser);
        element.widget.beginFill(0xFF0000).drawRect(0, 0, 1, 1).endFill();
        if (!isNullOrUndefined(layout.size)) {
            element.width = layout.size.width;
            element.height = layout.size.height;
        }
    }
}