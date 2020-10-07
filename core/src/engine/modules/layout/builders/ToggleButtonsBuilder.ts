import { ButtonView } from '../../../../components/views/ButtonView';
import { ContainerBuilder } from './ContainerBuilder';
import { BaseParser } from '../parsers/BaseParser';
import { IView } from "../../../../components/views/IView";
import { ToggleButtonsView } from "../../../../components/views/ToggleButtonsView";

export class ToggleButtonsBuilder extends ContainerBuilder {
    protected createDefault(layout: any, layoutParser: BaseParser): IView {
        return new ToggleButtonsView();
    }

    public applyAttributes(element: ToggleButtonsView, layout: any, layoutParser: BaseParser): void {
        super.applyAttributes(element, layout, layoutParser);

        const children: any[] = layout.buttons || [];
        for (const childLayout of children) {
            const child: IView = layoutParser.createFromLayout(childLayout);
            if (child && child instanceof ButtonView) {
                element.addButton(child as ButtonView);
            }
        }
    }
}