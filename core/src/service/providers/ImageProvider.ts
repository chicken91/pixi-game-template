import { AbstractLoaderProvider } from "./AbstractLoaderProvider";
import { AssetsType } from "../../types/AssetsType";
import { IImageResource } from "../../types/interface/IImageResource";
import { LoadUtils } from "../../utils/LoadUtils";
import { bind } from "../../factory/di/inject";
import { Loader } from "three";

@bind()
export class ImageProvider extends AbstractLoaderProvider {
    protected loader: Loader = new Loader();

    public load(): Promise<any> {
        return Promise.resolve();
    }

    public prepare(data: IImageResource): void {

    }

    public get type(): string {
        return AssetsType.IMAGES;
    }
}