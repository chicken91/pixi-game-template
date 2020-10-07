import { BaseBuilder } from "./BaseBuilder";
import { BaseParser } from "../parsers/BaseParser";
import { spine } from "pixi.js";
import { SpineModel } from "../../assetLoader/models/SpineModel";
import { isNullOrUndefined } from "util";
import { SpineView } from "../../../../components/views/SpineView";
import { inject } from "../../../../injects/inject";
import { IView } from "../../../../components/views/IView";

export class SpineBuilder extends BaseBuilder {
    protected spineModel: SpineModel = inject(SpineModel);

    protected createCustom(customClass: any, layout: any, layoutParser: BaseParser): IView {
        return new customClass(this.getSkeletonData(layout.spineId));
    }

    protected createDefault(layout: any, layoutParser: BaseParser): IView {
        return new SpineView(this.getSkeletonData(layout.spineId));
    }

    protected getSkeletonData(spineId: string): spine.core.SkeletonData {
        return this.spineModel.getSpineDataById(spineId);
    }

    public applyAttributes(element: SpineView, layout: any, layoutParser: BaseParser): void {
        super.applyAttributes(element, layout, layoutParser);

        if (!isNullOrUndefined(layout.animation)) {
            element.defaultAnimation = layout.animation;
        }
    }
}