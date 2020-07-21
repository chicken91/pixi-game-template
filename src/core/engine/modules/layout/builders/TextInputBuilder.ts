import { BaseBuilder } from "./BaseBuilder";
import { BaseParser } from "../parsers/BaseParser";
import { SpineView } from "../../../../components/views/SpineView";
import { IView } from "../../../../components/views/IView";
import { TextInputView } from "../../../../components/views/TextInputView";

export class TextInputBuilder extends BaseBuilder {

    public applyAttributes(element: SpineView, layout: any, layoutParser: BaseParser): void {
        super.applyAttributes(element, layout, layoutParser);
    }

    protected createDefault(layout: any, layoutParser: BaseParser): IView {
        return new TextInputView(layout.style);
    }
}