import { Kernel } from '../../../injects/Kernel';
import { ApplicationModule } from '../ApplicationModule';
import { AssetDataFactory } from './models/data/AssetDataFactory';
import { InitialAssetsProgressManager } from './managers/InitialAssetsProgressManager';
import { LoadManager } from './managers/LoadManager';
import { LoadToGpuManager } from './managers/LoadToGpuManager';
import { LoadModel } from './models/LoadModel';
import { SpineModel } from './models/SpineModel';
import { AbstractSoundProvider } from './providers/AbstractSoundProvider';
import { SpineProvider } from './providers/SpineProvider';
import { ImageProvider } from './providers/ImageProvider';
import { FontProvider } from './providers/FontProvider';

export class AssetsLoaderModule extends ApplicationModule {

    protected addInjections(kernel: Kernel): void {
        kernel.bind(LoadModel).asSingleton();
        kernel.bind(SpineModel).asSingleton();

        kernel.bind(AbstractSoundProvider);
        kernel.bind(ImageProvider);
        kernel.bind(SpineProvider);
        kernel.bind(FontProvider);


        kernel.bind(AssetDataFactory).asSingleton();

        kernel.bind(InitialAssetsProgressManager).forceCreation().asSingleton();
        kernel.bind(LoadManager).forceCreation().asSingleton();
        kernel.bind(LoadToGpuManager).forceCreation().asSingleton();
    }
}