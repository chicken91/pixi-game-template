import { CoreContext } from './CoreContext';
import { EventDispatcher } from "../components/events/EventDispatcher";
import { InitialAssetsProgressManager } from "./modules/assetLoader/managers/InitialAssetsProgressManager";
import { LoadManager } from "./modules/assetLoader/managers/LoadManager";
import { LoadToGpuManager } from "./modules/assetLoader/managers/LoadToGpuManager";
import { AssetDataFactory } from "./modules/assetLoader/models/data/AssetDataFactory";
import { LoadModel } from "./modules/assetLoader/models/LoadModel";
import { SpineModel } from "./modules/assetLoader/models/SpineModel";
import { AbstractSoundProvider } from "./modules/assetLoader/providers/AbstractSoundProvider";
import { FontProvider } from "./modules/assetLoader/providers/FontProvider";
import { ImageProvider } from "./modules/assetLoader/providers/ImageProvider";
import { SpineProvider } from "./modules/assetLoader/providers/SpineProvider";
import { GameModel } from "./modules/game/model/GameModel";
import { GameConfig } from "./modules/game/config/GameConfig";
import { SceneManager } from "./modules/game/managers/SceneManager";
import { LoadConfigAction } from "./modules/game/actions/LoadConfigAction";
import { PreloadAssetsAction } from "./modules/game/actions/PreloadAssetsAction";
import { InitialAssetsAction } from "./modules/game/actions/InitialAssetsAction";
import { LazyAssetsAction } from "./modules/game/actions/LazyAssetsAction";
import { ShowGameSceneAction } from "./modules/game/actions/ShowGameSceneAction";
import { ShowLoadSceneAction } from "./modules/game/actions/ShowLoadSceneAction";
import { HideLoadSceneAction } from "./modules/game/actions/HideLoadSceneAction";
import { InteractionEventManager } from "./modules/interaction/managers/InteractionEventManager";
import { CoreConstants } from "./modules/CoreConstants";
import { KeyboardManager } from "./modules/interaction/managers/KeyboardManager";
import { LayoutModel } from "./modules/layout/models/LayoutModel";
import { ImageBuilder } from "./modules/layout/builders/ImageBuilder";
import { ResizeAreaBuilder } from "./modules/layout/builders/ResizeAreaBuilder";
import { GraphicsBuilder } from "./modules/layout/builders/GraphicsBuilder";
import { ComponentBuilder } from "./modules/layout/builders/ComponentBuilder";
import { ContainerBuilder } from "./modules/layout/builders/ContainerBuilder";
import { GroupContainerBuilder } from "./modules/layout/builders/GroupContainerBuilder";
import { ButtonBuilder } from "./modules/layout/builders/ButtonBuilder";
import { SpineBuilder } from "./modules/layout/builders/SpineBuilder";
import { ToggleButtonsBuilder } from "./modules/layout/builders/ToggleButtonsBuilder";
import { TextBuilder } from "./modules/layout/builders/TextBuilder";
import { BitmapTextBuilder } from "./modules/layout/builders/BitmapTextBuilder";
import { TextInputBuilder } from "./modules/layout/builders/TextInputBuilder";
import { ButtonPolicy } from "../components/policy/ButtonPolicy";
import { LongPressButtonPolicy } from "../components/policy/LongPressButtonPolicy";
import { ToggleButtonPolicy } from "../components/policy/ToggleButtonPolicy";
import { LayoutPropertiesPool } from "./modules/layout/parsers/LayoutPropertiesPool";
import { LayoutParser } from "./modules/layout/parsers/LayoutParser";
import { LocaleModel } from "./modules/locale/models/LocaleModel";
import { ScreenModel } from "./modules/screen/model/ScreenModel";
import { RenderModel } from "./modules/screen/model/RenderModel";
import { TimerManager } from "./modules/screen/manager/TimerManager";
import { RenderManager } from "./modules/screen/manager/RenderManager";
import { ResizeManager } from "./modules/screen/manager/ResizeManager";
import { ServerRequestFactory } from "./modules/server/factory/ServerRequestFactory";
import { ServerManager } from "./modules/server/managers/ServerManager";
import { InitializeServerAction } from "./modules/server/actions/InitializeServerAction";
import { HowlerSoundModel } from "./modules/sounds/models/howler/HowlerSoundModel";
import { HowlerSoundManager } from "./modules/sounds/managers/howler/HowlerSoundManager";
import { HowlerSoundProvider } from "./modules/sounds/providers/HowlerSoundProvider";
import { StateMachineModel } from "./modules/stateMachine/model/StateMachineModel";
import { StateMachine } from "./modules/stateMachine/entity/StateMachine";
import { LoadState } from "./modules/stateMachine/states/LoadState";
import { IdleState } from "./modules/stateMachine/states/IdleState";
import { LoadView } from "./modules/game/loadScene/views/LoadView";
import { ProgressBarView } from "./modules/game/loadScene/views/ProgressBarView";

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
            InitialAssetsProgressManager,
            LoadManager,
            LoadToGpuManager,
            AssetDataFactory,
            LoadModel,
            SpineModel,
            AbstractSoundProvider,
            FontProvider,
            ImageProvider,
            SpineProvider,
            GameModel,
            GameConfig,
            SceneManager,
            LoadConfigAction,
            PreloadAssetsAction,
            InitialAssetsAction,
            LazyAssetsAction,
            ShowGameSceneAction,
            ShowLoadSceneAction,
            HideLoadSceneAction,
            ScreenModel,
            RenderModel,
            TimerManager,
            RenderManager,
            ResizeManager,
            InteractionEventManager,
            LayoutModel,
            ImageBuilder,
            ResizeAreaBuilder,
            GraphicsBuilder,
            ComponentBuilder,
            ContainerBuilder,
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
            ServerManager,
            InitializeServerAction,
            HowlerSoundModel,
            HowlerSoundManager,
            HowlerSoundProvider,
            StateMachineModel,
            StateMachine,
            LoadState,
            IdleState
        ];
    }

    protected getDesktopBindedClasses(): Array<Function> {
        return [
            KeyboardManager
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