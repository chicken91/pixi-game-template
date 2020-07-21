import { BaseBuilder } from './BaseBuilder';
import { isNullOrUndefined } from 'util';
import { BaseParser } from "../parsers/BaseParser";
import { IView } from '../../../../components/views/IView';
import { BitmapTextView } from "../../../../components/views/BitmapTextView";

export class BitmapTextBuilder extends BaseBuilder {

    protected createDefault(layout: any, layoutParser: BaseParser): IView {
        return new BitmapTextView(this.getText(layout), layout.style || undefined);
    }

    protected createCustom(customClass: any, layout: any, layoutParser: BaseParser): IView {
        return new customClass(this.getText(layout), layout.style || undefined);
    }

    protected getText(layout: any): string {
        let text: string = "";

        if (!isNullOrUndefined(layout.localeId)) {
            text = layout.localeId;
        } else if (layout.text) {
            text = layout.text;
        }
        return text;
    }

    public applyAttributes(element: BitmapTextView, layout: any, layoutParser: BaseParser): void {
        if (!isNullOrUndefined(layout.width)) {
            element.width = layout.width;
        }

        if (!isNullOrUndefined(layout.height)) {
            element.height = layout.height;
        }

        if (!isNullOrUndefined(layout.font)) {
            element.widget.font = layout.font;
        }
        if (layout.realAnchor) {
            element.widget.anchor = layout.realAnchor;
        }

        super.applyAttributes(element, layout, layoutParser);
    }
}