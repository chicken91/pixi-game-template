import { ViewType } from "../../../types/ViewType";
import { AbstractParser } from "./AbstractParser";
import { ComponentBuilder } from "../builders/ComponentBuilder";
import { bind, inject } from "../../di/inject";
import { SceneBuilder } from "../builders/SceneBuilder";

@bind({singleton: true})
export class LayoutParser extends AbstractParser {
    protected addBuilders(): void {
        this.addBuilder(ViewType.Component, inject(ComponentBuilder));
        this.addBuilder(ViewType.Scene, inject(SceneBuilder));

    }
}