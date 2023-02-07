import { AbstractLoaderProvider } from "./AbstractLoaderProvider";
import { AssetsType } from "../../types/AssetsType";
import { IFontResource } from '../../types/interface/IFontResource';
import { bind } from "../../factory/di/inject";
import WebFont = require('webfontloader');

@bind()
export class FontProvider extends AbstractLoaderProvider {

    protected fontToLoad!: string;

    public load(): Promise<any> {
        return new Promise<any>(resolve => {

            WebFont.load({
                custom: {
                    families: [this.fontToLoad]
                },
                active: () => {
                    resolve();
                },
                inactive: () => {
                    resolve();
                }
            });

        });
    }

    public prepare(data: IFontResource): void {
        this.fontToLoad = data.id;
    }

    public get type(): string {
        return AssetsType.FONTS;
    }
}