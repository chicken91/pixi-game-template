import { StateMachineModule } from './modules/stateMachine/StateMachineModule';
import { LocaleModule } from './modules/locale/LocaleModule';
import { CoreContext } from './CoreContext';
import { LayoutModule } from "./modules/layout/LayoutModule";
import { ScreenModule } from "./modules/screen/ScreenModule";
import { AssetsLoaderModule } from "./modules/assetLoader/AssetsLoaderModule";
import { ApplicationModule } from "./modules/ApplicationModule";
import { HowlerSoundModule } from "./modules/sounds/HowlerSoundModule";
import { ServerModule } from './modules/server/ServerModule';
import { InteractionModule } from "./modules/interaction/InteractionModule";
import { GameModule } from './modules/game/GameModule';
import { LoadSceneModule } from "./modules/game/loadScene/LoadSceneModule";

export class CoreLoader {
    protected context: CoreContext;

    /**
     * This class responsible for adding modules to the game. Each module inject some classes
     * On Game level must be selected proper modules for each game
     * @param context scope in which loader add modules
     */
    constructor(context: CoreContext) {
        this.context = context;
        this.initialize();
        this.activate();
    }

    /**
     * currently onlye adding modules
     */
    protected initialize(): void {
        this.addModules(this.context);
    }

    /**
     * activates the context
     */
    protected activate(): void {
        this.context.activate();
    }

    /**
     * Adding modules from current game level to the context
     * @param context our context of the game
     */
    protected addModules(context: CoreContext): void {
        this.addModule(new ScreenModule(context));
        this.addModule(new LayoutModule(context));
        this.addModule(new AssetsLoaderModule(context));
        this.addModule(new LocaleModule(context));
        this.addModule(new StateMachineModule(context));
        this.addModule(new HowlerSoundModule(context));
        this.addModule(new ServerModule(context));
        this.addModule(new InteractionModule(context));
        this.addModule(new GameModule(context));
        this.addModule(new LoadSceneModule(context));
    }

    protected addModule(module: ApplicationModule): this {
        this.context.addModule(module);
        return this;
    }
}