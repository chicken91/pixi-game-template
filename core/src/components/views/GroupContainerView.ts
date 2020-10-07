import { ContainerView } from "./ContainerView";
import { FitResizeProperty } from "./resizeProperty/FitResizeProperty";
import { IResizeProperty } from "./resizeProperty/IResizeProperty";

export class GroupContainerView extends ContainerView {

    public createResizeProperty(): IResizeProperty {
        return new FitResizeProperty(this);
    }
}