import { LongPressButtonPolicy } from '../../../../components/policy/LongPressButtonPolicy';
import { ButtonPolicy } from '../../../../components/policy/ButtonPolicy';
import { BaseParser } from '../parsers/BaseParser';
import { ContainerBuilder } from './ContainerBuilder';
import { ButtonView } from "../../../../components/views/ButtonView";
import { IView } from "../../../../components/views/IView";
import { ButtonViewType } from "../../../../components/types/ButtonViewType";
import { inject } from '../../../../injects/inject';
import { ToggleButtonPolicy } from '../../../../components/policy/ToggleButtonPolicy';
import { isNullOrUndefined } from "util";
import { CoreConstants } from "../../CoreConstants";
import Rectangle = PIXI.Rectangle;

export class ButtonBuilder extends ContainerBuilder {
    protected createDefault(layout: any, layoutParser: BaseParser): IView {
        return new ButtonView();
    }

    public applyAttributes(element: ButtonView, layout: any, layoutParser: BaseParser): void {
        super.applyAttributes(element, layout, layoutParser);

        if (CoreConstants.deviceType.MOBILE && !isNullOrUndefined(layout.movable)) {
            element.movable = layout.movable;
        }
        const buttonPolicy: ButtonPolicy = this.getButtonPolicy(layout);
        buttonPolicy.setObject(element);
        element.setPolicy(buttonPolicy);

        if (layout.hitArea) {
            element.setHitArea(new Rectangle(layout.hitArea.x, layout.hitArea.y, layout.hitArea.width, layout.hitArea.height));
        }

        for (let state in layout.components) {
            if (layout.components.hasOwnProperty(state)) {
                const stateObject = layout.components[state];
                stateObject.forEach(stateElement => {
                    const component = layoutParser.createFromLayout(stateElement);
                    element.setStateComponent(state, component);
                });
            }
        }

        for (let state in layout.states) {
            const stateObject = layout.states[state];
            element.setStateTexture(state, PIXI.utils.TextureCache[stateObject]);
        }

        if (layout.mainImageAnchor) {
            element.setMainImageAnchor(layout.mainImageAnchor);
        }
        element.onChangeState(ButtonViewType.NORMAL);
    }

    protected getButtonPolicy(layout: any): ButtonPolicy {
        if (layout.toggle) {
            return inject(ToggleButtonPolicy);
        } else if (layout.longPressEnabled) {
            return inject(LongPressButtonPolicy);
        }

        return inject(ButtonPolicy);
    }
}