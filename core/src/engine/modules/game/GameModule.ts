import { ApplicationModule } from '../ApplicationModule';
import { Kernel } from '../../../injects/Kernel';
import { GameConfig } from './config/GameConfig';
import { GameModel } from "./model/GameModel";
import { LoadConfigAction } from "./actions/LoadConfigAction";
import { PreloadAssetsAction } from "./actions/PreloadAssetsAction";
import { InitialAssetsAction } from "./actions/InitialAssetsAction";
import { LazyAssetsAction } from "./actions/LazyAssetsAction";
import { ShowGameSceneAction } from "./actions/ShowGameSceneAction";
import { ShowLoadSceneAction } from "./actions/ShowLoadSceneAction";
import { HideLoadSceneAction } from "./actions/HideLoadSceneAction";
import { SceneManager } from "./managers/SceneManager";

export class GameModule extends ApplicationModule {
    protected addInjections(kernel: Kernel): void {
        kernel.bind(GameModel).asServerModel();
        kernel.bind(GameConfig).asSingleton();

        kernel.bind(SceneManager).asSingleton().forceCreation();

        kernel.bind(LoadConfigAction).asSingleton();
        kernel.bind(PreloadAssetsAction).asSingleton();
        kernel.bind(InitialAssetsAction).asSingleton();
        kernel.bind(LazyAssetsAction).asSingleton();
        kernel.bind(ShowGameSceneAction).asSingleton();
        kernel.bind(ShowLoadSceneAction).asSingleton();
        kernel.bind(HideLoadSceneAction).asSingleton();
    }
}