import { AbstractBuilder } from "./AbstractBuilder";
import { AbstractParser } from "../parsers/AbstractParser";
import { bind } from "../../di/inject";
import { Object3D } from "three";
import { Object3DView } from "../../../views/Object3DView";

@bind()
export class ComponentBuilder extends AbstractBuilder<Object3D> {

    protected createCustom(customClass: any, layout: any, layoutParser: AbstractParser): Object3DView<Object3D> {
        return this.createDefault(layout, layoutParser);
    }

    protected createDefault(layout: any, layoutParser: AbstractParser): Object3DView<Object3D> {
        try {
            return layoutParser.createFromLibrary(layout.libId);
        } catch (e) {
            console.error(e);
        }

        return new Object3DView(new Object3D());
    }

    public getType(): { new(): Object3D } {
        return Object3D;
    }
}