import { AbstractParser } from "../parsers/AbstractParser";
import { Object3D } from "three";
import { Object3DView } from "../../../views/Object3DView";

export abstract class AbstractBuilder<T extends Object3D> {

    protected abstract createDefault(layout: any, layoutParser: AbstractParser): Object3DView<T> ;

    public create(layout: any, layoutParser: AbstractParser, customClass?: any): Object3DView<T> {
        const element = this.createComponent(layout, layoutParser, customClass);
        this.applyAttributes(element, layout, layoutParser);
        return element;
    }

    protected applyAttributes(view: Object3DView<T>, layout: any, layoutParser: AbstractParser): void {
        if (layout.visible != null)
            view.object3D.visible = layout.visible;

        if (layout.scale != null)
            view.object3D.scale.set(layout.scale.x || 1, layout.scale.y || 1, layout.scale.z || 1);

        if (layout.position != null)
            view.object3D.position.set(layout.position.x || 0, layout.position.y || 0, layout.position.z || 0);

        if (layout.rotation != null)
            view.object3D.rotation.set(layout.rotation.x || 0, layout.rotation.y || 0, layout.rotation.z || 0);
    }

    protected createComponent(layout: any, layoutParser: AbstractParser, customClass: any): Object3DView<T> {
        return (customClass) ? this.createCustom(customClass, layout, layoutParser) : this.createDefault(layout, layoutParser);
    }

    protected createCustom(customClass: any, layout: any, layoutParser: AbstractParser): Object3DView<T> {
        return new customClass();
    }
}