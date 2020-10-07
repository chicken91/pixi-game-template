import { LongPressButtonPolicy } from '../../../components/policy/LongPressButtonPolicy';
import { ButtonPolicy } from '../../../components/policy/ButtonPolicy';
import { BitmapTextBuilder } from './builders/BitmapTextBuilder';
import { TextBuilder } from './builders/TextBuilder';
import { ToggleButtonsBuilder } from './builders/ToggleButtonsBuilder';
import { LayoutParser } from './parsers/LayoutParser';
import { ButtonBuilder } from './builders/ButtonBuilder';
import { ComponentBuilder } from './builders/ComponentBuilder';
import { ContainerBuilder } from './builders/ContainerBuilder';
import { ImageBuilder } from './builders/ImageBuilder';
import { ApplicationModule } from '../ApplicationModule';
import { SpineBuilder } from './builders/SpineBuilder';
import { Kernel } from "../../../injects/Kernel";
import { GroupContainerBuilder } from "./builders/GroupContainerBuilder";
import { ResizeAreaBuilder } from "./builders/ResizeAreaBuilder";
import { GraphicsBuilder } from "./builders/GraphicsBuilder";
import { LayoutModel } from "./models/LayoutModel";
import { LayoutPropertiesPool } from "./parsers/LayoutPropertiesPool";
import { ToggleButtonPolicy } from '../../../components/policy/ToggleButtonPolicy';
import { TextInputBuilder } from "./builders/TextInputBuilder";

export class LayoutModule extends ApplicationModule {
    protected addInjections(kernel: Kernel): void {
        kernel.bind(LayoutModel).asSingleton();

        kernel.bind(ImageBuilder);
        kernel.bind(ResizeAreaBuilder);
        kernel.bind(GraphicsBuilder);
        kernel.bind(ComponentBuilder);
        kernel.bind(ContainerBuilder);
        kernel.bind(GroupContainerBuilder);
        kernel.bind(ButtonBuilder);
        kernel.bind(SpineBuilder);
        kernel.bind(ToggleButtonsBuilder);
        kernel.bind(TextBuilder);
        kernel.bind(BitmapTextBuilder);
        kernel.bind(TextInputBuilder);

        kernel.bind(ButtonPolicy);
        kernel.bind(LongPressButtonPolicy);
        kernel.bind(ToggleButtonPolicy);

        kernel.bind(LayoutPropertiesPool).asSingleton();
        kernel.bind(LayoutParser).asSingleton();
    }
}