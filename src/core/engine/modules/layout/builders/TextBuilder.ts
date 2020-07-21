import { BaseBuilder } from './BaseBuilder';
import { isNullOrUndefined } from 'util';
import { TextView } from "../../../../components/views/TextView";
import { BaseParser } from "../parsers/BaseParser";
import { IView } from '../../../../components/views/IView';
import { LocaleModel } from "../../locale/models/LocaleModel";
import { inject } from "../../../../injects/inject";
import { LayoutModel } from '../models/LayoutModel';
import { TextStyle } from 'pixi.js';

export class TextBuilder extends BaseBuilder {
    private localeModel: LocaleModel = inject(LocaleModel);
    private layoutModel: LayoutModel = inject(LayoutModel);

    protected createDefault(layout: any, layoutParser: BaseParser): IView {
        return new TextView();
    }

    public applyAttributes(element: TextView, layout: any, layoutParser: BaseParser): void {
        element.widget.text = this.getTextByLayout(layout);


        if (!isNullOrUndefined(layout.width)) {
            element.width = layout.width;
        }

        if (!isNullOrUndefined(layout.height)) {
            element.height = layout.height;
        }
        if (!isNullOrUndefined(layout.style)) {

            element.widget.style = layout.style;

            if (isNullOrUndefined(layout.style.fontFamily)) {
                element.widget.style.fontFamily = this.layoutModel.fontSettings;
            }
        } else if (this.layoutModel.fontSettings) {
            element.widget.style = new TextStyle({fontFamily: this.layoutModel.fontSettings});
        }

        if (layout.realAnchor) {
            element.widget.anchor = layout.realAnchor;
        }

        if (!isNullOrUndefined(layout.size)) {
            element.setTextAreaSize(layout.size.width, layout.size.height);
        }
        if (!isNullOrUndefined(layout.debug)) {
            element.debugTextArea();
        }

        super.applyAttributes(element, layout, layoutParser);
    }

    protected getTextByLayout(layout): string {
        let text;
        if (!isNullOrUndefined(layout.text)) {
            text = layout.text;
        }
        return text;
    }
}