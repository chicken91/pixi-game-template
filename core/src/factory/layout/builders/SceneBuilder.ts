import { AbstractParser } from "../parsers/AbstractParser";
import { AbstractBuilder } from "./AbstractBuilder";
import { bind } from "../../di/inject";
import { Camera, Color, Object3D, Scene } from "three";
import { Object3DView } from "../../../views/Object3DView";
import { SceneView } from "../../../views/SceneView";

@bind()
export class SceneBuilder extends AbstractBuilder<Scene> {

    protected createDefault(layout: any, layoutParser: AbstractParser): SceneView {
        return new SceneView(new Scene());
    }

    protected createComponent(layout: any, layoutParser: AbstractParser, customClass: any): Object3DView<Scene> {
        let element = super.createComponent(layout, layoutParser, customClass);

        this.createChildComponent(<SceneView>element, layout, layoutParser);
        return element;
    }


    protected applyAttributes(view: SceneView, layout: any, layoutParser: AbstractParser): void {
        super.applyAttributes(view, layout, layoutParser);

        if (layout.background != null)
            view.object3D.background = new Color(layout.background);

        if (layout.camera != null)
            view.camera = <Object3DView<Camera>>layoutParser.createFromLayout(view.camera);

        this.createChildComponent(view, layout, layoutParser);
    }

    protected createChildComponent(element: SceneView, layout: any, layoutParser: AbstractParser): void {
        const children: any[] = layout.children || [];
        for (const childLayout of children) {
            const child: Object3DView<Object3D> = layoutParser.createFromLayout(childLayout);
            if (child) {
                element.object3D.add(child.object3D);
                if (childLayout.id) {
                    element[childLayout.id] = child;
                }
            }
        }
    }
}