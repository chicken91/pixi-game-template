import { BitmapTextBuilder } from '../builders/BitmapTextBuilder';
import { TextBuilder } from '../builders/TextBuilder';
import { inject } from '../../../../injects/inject';
import { ButtonBuilder } from '../builders/ButtonBuilder';
import { ComponentBuilder } from '../builders/ComponentBuilder';
import { ContainerBuilder } from '../builders/ContainerBuilder';
import { GroupContainerBuilder } from '../builders/GroupContainerBuilder';
import { ImageBuilder } from '../builders/ImageBuilder';
import { SpineBuilder } from '../builders/SpineBuilder';
import { ViewType } from '../../../../components/types/ViewType';
import { ToggleButtonsBuilder } from '../builders/ToggleButtonsBuilder';
import { BaseParser } from './BaseParser';
import { ResizeAreaBuilder } from "../builders/ResizeAreaBuilder";
import { GraphicsBuilder } from "../builders/GraphicsBuilder";
import { TextInputBuilder } from "../builders/TextInputBuilder";

export class LayoutParser extends BaseParser {
    protected addBuilders(): void {
        this.addBuilder(ViewType.COMPONENT, inject(ComponentBuilder));
        this.addBuilder(ViewType.CONTAINER, inject(ContainerBuilder));
        this.addBuilder(ViewType.GROUP_CONTAINER, inject(GroupContainerBuilder));
        this.addBuilder(ViewType.IMAGE, inject(ImageBuilder));
        this.addBuilder(ViewType.RESIZE_AREA, inject(ResizeAreaBuilder));
        this.addBuilder(ViewType.GRAPHICS, inject(GraphicsBuilder));
        this.addBuilder(ViewType.BUTTON, inject(ButtonBuilder));
        this.addBuilder(ViewType.SPINE, inject(SpineBuilder));
        this.addBuilder(ViewType.TOGGLE_BUTTONS, inject(ToggleButtonsBuilder));
        this.addBuilder(ViewType.TEXT, inject(TextBuilder));
        this.addBuilder(ViewType.BITMAP_TEXT, inject(BitmapTextBuilder));
        this.addBuilder(ViewType.TEXT_INPUT, inject(TextInputBuilder));

    }
}