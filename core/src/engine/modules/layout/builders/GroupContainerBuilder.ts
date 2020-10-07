import { BaseParser } from "../parsers/BaseParser";
import { IView } from "../../../../components/views/IView";
import { GroupContainerView } from "../../../../components/views/GroupContainerView";
import { ContainerBuilder } from "./ContainerBuilder";

export class GroupContainerBuilder extends ContainerBuilder {

    protected createDefault(layout: any, layoutParser: BaseParser): IView {
        return new GroupContainerView();
    }
}