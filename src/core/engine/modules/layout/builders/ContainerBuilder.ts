import { BaseParser } from "../parsers/BaseParser";
import { BaseBuilder } from "./BaseBuilder";
import { ContainerView } from "../../../../components/views/ContainerView";
import { IView } from "../../../../components/views/IView";
import { isNullOrUndefined } from "util";

export class ContainerBuilder extends BaseBuilder {
    protected createDefault(layout: any, layoutParser: BaseParser): IView {
        return new ContainerView();
    }

    protected createComponent(layout: any, layoutParser: BaseParser, customClass: any): IView {
        let element = super.createComponent(layout, layoutParser, customClass);
        this.createChildComponent(<ContainerView>element, layout, layoutParser);
        return element;
    }

    protected createChildComponent(element: ContainerView, layout: any, layoutParser: BaseParser): void {
        const children: any[] = layout.children || [];
        for (const childLayout of children) {
            const child: IView = layoutParser.createFromLayout(childLayout);
            if (child) {
                element.addChild(child);
                if (childLayout.id) {
                    element[childLayout.id] = child;
                }
            }
        }

        if (!isNullOrUndefined(layout.mask)) {
            element.addMask(layout.mask.width,
                layout.mask.height,
                layout.mask.x || 0,
                layout.mask.y || 0);
        }
    }
}