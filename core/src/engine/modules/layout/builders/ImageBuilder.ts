import { BaseBuilder } from "./BaseBuilder";
import { BaseParser } from "../parsers/BaseParser";
import { isNullOrUndefined } from "util";
import { LoadModel } from "../../assetLoader/models/LoadModel";
import { inject } from "../../../../injects/inject";
import { ImageView } from "../../../../components/views/ImageView";
import { TextureUtils } from "../../assetLoader/utils/TextureUtils";

export class ImageBuilder extends BaseBuilder {
    protected loadModel: LoadModel = inject(LoadModel);

    protected createDefault(layout: any, layoutParser: BaseParser): ImageView {
        return new ImageView();
    }

    public applyAttributes(element: ImageView, layout: any, layoutParser: BaseParser): void {
        super.applyAttributes(element, layout, layoutParser);

        element.widget.texture = TextureUtils.getTexture(layout.texture || '');

        if (!isNullOrUndefined(layout.tint)) {
            element.widget.tint = layout.tint;
        }

        if (layout.realAnchor) {
            element.widget.anchor = layout.realAnchor;
        }

        if (!isNullOrUndefined(layout.nSize)) {
            element.widget.width = layout.nSize.width || element.width;
            element.widget.height = layout.nSize.height || element.height;
        }
    }
}