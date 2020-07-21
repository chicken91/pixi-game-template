import { LoadUtils } from "../../assetLoader/utils/LoadUtils";
import { ISoundSprite } from "../entity/howler/ISoundSprite";
import { AbstractSound } from "../entity/AbstractSound";
import { HowlerSound } from "../entity/howler/HowlerSound";
import { IHowlerSoundResource } from "../entity/howler/IHowlerSoundResource";
import { AbstractSoundProvider } from "../../assetLoader/providers/AbstractSoundProvider";

export class HowlerSoundProvider extends AbstractSoundProvider {
    protected resource!: IHowlerSoundResource;
    protected howlMap: { [id: string]: Howl } = {};
    protected _soundSprites!: Array<string>;

    public load(): Promise<any> {
        return new Promise<any>(resolve => {
            LoadUtils.loadFile(this.resource.spriteUrl)
                .then(this.loadSound.bind(this))
                .then(resolve);
        });
    }

    public prepare(data: IHowlerSoundResource): void {
        this.resource = data;
    }

    public get soundSprites(): Array<string> {
        return this._soundSprites;
    }

    protected loadSound(spriteData: ISoundSprite): Promise<any> {
        return new Promise<any>(resolve => {
            const hostSrc = this.resource.src.map((src) => {
                return LoadUtils.appendHostUrl(src);
            });
            this._soundSprites = Object.keys(spriteData.sprite);
            const howl: Howl = new Howl({
                src: hostSrc,
                preload: false,
                autoplay: false,
                sprite: spriteData.sprite,
                onload: this.onSoundLoaded.bind(this, resolve)
            });
            this.howlMap[this.resource.id] = howl;
            howl.load();
        });
    }

    protected createSound(id: string, soundInstance: Howl): AbstractSound {
        return new HowlerSound(id, soundInstance);
    }

    protected onSoundLoaded(resolveFunction: Function): void {
        let howl = this.howlMap[this.resource.id];
        for (let spriteId of this.soundSprites) {
            let sound = this.createSound(spriteId, howl);
            this.addSound(sound);
        }
        resolveFunction();
    }
}