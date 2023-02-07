import { CoreContext } from './CoreContext';
import { EventDispatcher } from "./service/EventDispatcher";
import { InitialAssetsProgressService } from "./service/InitialAssetsProgressService";
import { LoadService } from "./service/LoadService";
import { AssetDataFactory } from "./models/data/asset/AssetDataFactory";
import { LoadModel } from "./models/LoadModel";
import { AbstractSoundProvider } from "./service/providers/AbstractSoundProvider";
import { FontProvider } from "./service/providers/FontProvider";
import { ImageProvider } from "./service/providers/ImageProvider";
import { GameModel } from "./models/GameModel";
import { GameConfig } from "./models/GameConfig";
import { SceneService } from "./service/SceneService";
import { LoadConfigAction } from "./actions/LoadConfigAction";
import { PreloadAssetsAction } from "./actions/PreloadAssetsAction";
import { InitialAssetsAction } from "./actions/InitialAssetsAction";
import { LazyAssetsAction } from "./actions/LazyAssetsAction";
import { ShowGameSceneAction } from "./actions/ShowGameSceneAction";
import { ShowLoadSceneAction } from "./actions/ShowLoadSceneAction";
import { HideLoadSceneAction } from "./actions/HideLoadSceneAction";
import { CoreConstants } from "./types/constant/CoreConstants";
import { KeyboardService } from "./service/KeyboardService";
import { LayoutModel } from "./models/LayoutModel";
import { ImageBuilder } from "./factory/layout/builders/ImageBuilder";
import { GraphicsBuilder } from "./factory/layout/builders/GraphicsBuilder";
import { ComponentBuilder } from "./factory/layout/builders/ComponentBuilder";
import { SceneBuilder } from "./factory/layout/builders/SceneBuilder";
import { GroupContainerBuilder } from "./factory/layout/builders/GroupContainerBuilder";
import { ButtonBuilder } from "./factory/layout/builders/ButtonBuilder";
import { SpineBuilder } from "./factory/layout/builders/SpineBuilder";
import { ToggleButtonsBuilder } from "./factory/layout/builders/ToggleButtonsBuilder";
import { TextBuilder } from "./factory/layout/builders/TextBuilder";
import { BitmapTextBuilder } from "./factory/layout/builders/BitmapTextBuilder";
import { TextInputBuilder } from "./factory/layout/builders/TextInputBuilder";
import { ButtonPolicy } from "./views/core/policy/ButtonPolicy";
import { LongPressButtonPolicy } from "./views/core/policy/LongPressButtonPolicy";
import { ToggleButtonPolicy } from "./views/core/policy/ToggleButtonPolicy";
import { LayoutPropertiesPool } from "./factory/layout/parsers/LayoutPropertiesPool";
import { LayoutParser } from "./factory/layout/parsers/LayoutParser";
import { LocaleModel } from "./models/LocaleModel";
import { ScreenModel } from "./models/ScreenModel";
import { RenderModel } from "./models/RenderModel";
import { RenderService } from "./service/RenderService";
import { ResizeService } from "./service/ResizeService";
import { ServerRequestFactory } from "./factory/ServerRequestFactory";
import { ServerService } from "./service/ServerService";
import { InitializeServerAction } from "./actions/InitializeServerAction";
import { HowlerSoundModel } from "./models/HowlerSoundModel";
import { HowlerSoundService } from "./service/sound/HowlerSoundService";
import { HowlerSoundProvider } from "./factory/HowlerSoundProvider";
import { StateMachineModel } from "./models/StateMachineModel";
import { StateMachineService } from "./service/StateMachineService";
import { LoadState } from "./actions/states/LoadState";
import { IdleState } from "./actions/states/IdleState";
import { LoadView } from "./views/LoadView";
import { ProgressBarView } from "./views/ProgressBarView";

export class CoreLoader {
    protected context: CoreContext;

    constructor(context: CoreContext) {
        this.context = context;
        this.initialize();
        this.activate();
    }

    protected initialize(): void {
        this.context.addBindedClasses(this.getBindedClasses());
        if (CoreConstants.deviceType.DESKTOP) {
            this.context.addBindedClasses(this.getDesktopBindedClasses());
        }
        if (CoreConstants.deviceType.MOBILE) {
            this.context.addBindedClasses(this.getMobileBindedClasses());
        }
        this.context.addBindedClasses(this.getViewMappingClasses());
    }

    protected activate(): void {
        this.context.activate();
    }

    protected addModules(context: CoreContext): void {
    }

    protected getBindedClasses(): Array<Function> {
        return [
            EventDispatcher,
            InitialAssetsProgressService,
            LoadService,
            AssetDataFactory,
            LoadModel,
            AbstractSoundProvider,
            FontProvider,
            ImageProvider,
            GameModel,
            GameConfig,
            SceneService,
            LoadConfigAction,
            PreloadAssetsAction,
            InitialAssetsAction,
            LazyAssetsAction,
            ShowGameSceneAction,
            ShowLoadSceneAction,
            HideLoadSceneAction,
            ScreenModel,
            RenderModel,
            RenderService,
            ResizeService,
            LayoutModel,
            ImageBuilder,
            GraphicsBuilder,
            ComponentBuilder,
            SceneBuilder,
            GroupContainerBuilder,
            ButtonBuilder,
            SpineBuilder,
            ToggleButtonsBuilder,
            TextBuilder,
            BitmapTextBuilder,
            TextInputBuilder,
            ButtonPolicy,
            LongPressButtonPolicy,
            ToggleButtonPolicy,
            LayoutPropertiesPool,
            LayoutParser,
            LocaleModel,
            ServerRequestFactory,
            ServerService,
            InitializeServerAction,
            HowlerSoundModel,
            HowlerSoundService,
            HowlerSoundProvider,
            StateMachineModel,
            StateMachineService,
            LoadState,
            IdleState
        ];
    }

    protected getDesktopBindedClasses(): Array<Function> {
        return [
            KeyboardService
        ];
    }

    protected getMobileBindedClasses(): Array<Function> {
        return [];
    }

    protected getViewMappingClasses(): Array<Function> {
        return [
            LoadView,
            ProgressBarView
        ];
    }
}