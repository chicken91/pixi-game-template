import { BaseBuilder } from "./BaseBuilder";
import { BaseParser } from "../parsers/BaseParser";
import { ContainerView } from "../../../../components/views/ContainerView";
import { IView } from "../../../../components/views/IView";

export class ComponentBuilder extends BaseBuilder {

    protected createCustom(customClass: any, layout: any, layoutParser: BaseParser): IView {
        return this.createDefault(layout, layoutParser);
    }

    protected createDefault(layout: any, layoutParser: BaseParser): IView {
        try {
            return layoutParser.createFromLibrary(layout.libId);
        } catch (e) {
            console.error(e);
        }

        return new ContainerView();
    }
}