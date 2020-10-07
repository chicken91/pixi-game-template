import { BaseParser } from "../parsers/BaseParser";
import { isNullOrUndefined } from "util";
import { IView } from "../../../../components/views/IView";
import { inject } from "../../../../injects/inject";
import { LayoutPropertiesPool } from "../parsers/LayoutPropertiesPool";
import { ResizePropertyType } from "../../../../components/types/ResizePropertyType";
import { IResizeProperty } from "../../../../components/views/resizeProperty/IResizeProperty";
import { CoreConstants } from "../../CoreConstants";
import Point = PIXI.Point;

export abstract class BaseBuilder {
    protected propertiesPool: LayoutPropertiesPool = inject(LayoutPropertiesPool);

    /**
     * Creates appropriate class from the layout given
     * @param layout from json file
     * @param layoutParser base parser for layout
     * @param customClass class by which element can be created (assignes through binding)
     */
    public create(layout: any, layoutParser: BaseParser, customClass?: any): IView {
        this.propertiesPool.addProperties(layout);
        const element = this.createComponent(layout, layoutParser, customClass);
        this.propertiesPool.applyProperties(element, layout);
        this.applyAttributes(element, layout, layoutParser);
        this.propertiesPool.removeProperties(layout);
        return element;
    }

    /**
     * applying such properties as position, pivot, etc...
     * @param element to which applying properties (some image or container)
     * @param layout data from layout json file
     * @param layoutParser parser used by some child classes to make building proccess recursive
     */
    protected applyAttributes(element: IView, layout: any, layoutParser: BaseParser): void {
        if (!isNullOrUndefined(layout.pivot)) {
            element.pivot.set(layout.pivot.x || 0, layout.pivot.y || 0);
        }
        if (!isNullOrUndefined(layout.visible)) {
            element.visible = layout.visible;
        }
        if (!isNullOrUndefined(layout.alpha)) {
            element.alpha = layout.alpha;
        }
        if (!isNullOrUndefined(layout.scale)) {
            element.scale = new Point(layout.scale.x || 1, layout.scale.y || 1);
        }
        if (!isNullOrUndefined(layout.position)) {
            element.position = new Point(layout.position.x || 0, layout.position.y || 0);
        }
        if (!isNullOrUndefined(layout.rotation)) {
            element.rotation = layout.rotation * (Math.PI / 180);
        }

        let resizeProperty: IResizeProperty = element.resizePropertyGroup.getResizePropertyByType(ResizePropertyType.DEFAULT);
        resizeProperty.onApplyProperty(layout);

        if (CoreConstants.deviceType.MOBILE && !isNullOrUndefined(layout.ratio)) {
            for (let ratioKey in layout.ratio) {
                if (layout.ratio.hasOwnProperty(ratioKey)) {
                    let ratioResizeProperty: IResizeProperty = element.createResizeProperty();
                    ratioResizeProperty.onApplyProperty(layout.ratio[ratioKey]);
                    element.resizePropertyGroup.addResizeProperty(ratioKey, ratioResizeProperty);
                }
            }
        }

        for (const prop in layout.props) {
            if (prop && !isNullOrUndefined(layout.props[prop])) {
                element[prop] = layout.props[prop];
            }
        }
    }

    protected createComponent(layout: any, layoutParser: BaseParser, customClass: any): IView {
        return (customClass) ? this.createCustom(customClass, layout, layoutParser) : this.createDefault(layout, layoutParser);
    }

    /**
     * Creates the default component
     * @param layout data from layout json file
     * @param layoutParser base parser for layout
     */
    protected abstract createDefault(layout: any, layoutParser: BaseParser): IView;

    /**
     * Creates component with custom class given
     * @param layout from json file
     * @param layoutParser base parser for layout
     * @param customClass class by which element can be created (assignes through binding)
     */
    protected createCustom(customClass: any, layout: any, layoutParser: BaseParser): IView {
        return new customClass();
    }
}