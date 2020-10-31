import { AbstractLoaderProvider } from "./AbstractLoaderProvider";
import { AssetsType } from "../types/AssetsType";
import { IImageResource } from "../interfaces/IImageResource";
import { LoadUtils } from "../utils/LoadUtils";
import { bind } from "../../../../injects/inject";
import Loader = PIXI.Loader;

@bind()
export class ImageProvider extends AbstractLoaderProvider {
    protected loader: Loader = new Loader();

    public load(): Promise<any> {
        return new Promise<any>(resolve => {
            this.loader.load(resolve);
        });
    }

    public prepare(data: IImageResource): void {
        if (data.atlas) {
            this.loader.add(data.id, LoadUtils.appendHostUrl(data.atlas));
        } else {
            this.loader.add(data.id, LoadUtils.appendHostUrl(data.src));
        }
    }

    public get type(): string {
        return AssetsType.IMAGES;
    }
}