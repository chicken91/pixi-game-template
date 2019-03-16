import Container = PIXI.Container;
import Sprite = PIXI.Sprite;
import Graphics = PIXI.Graphics;
import {IAssetsData} from "../../../../../common/type/interfaces/IAssetsData";
import {ReelState} from "../../../../../common/type/ReelState";
import {ReelData} from "../../../../data/reel/ReelData";

export class ReelWidget extends Container {
    protected readonly MAX_SYMBOL_COUNT: number = 7;
    protected readonly VISIBLE_SYMBOL_COUNT: number = 3;
    protected readonly OFFSET_SYMBOLS_COUNT: number = (this.MAX_SYMBOL_COUNT - this.VISIBLE_SYMBOL_COUNT) / 2;
    protected readonly CELL_HEIGHT: number = 200;
    protected readonly UPDATE_SYMBOLS_POSITION: number = -this.CELL_HEIGHT * (this.OFFSET_SYMBOLS_COUNT - 1);
    protected readonly SPINNING_SPEED: number = 5;

    protected symbolTextureIdList: Array<string> = [];
    protected symbolList: Array<Sprite> = [];

    constructor(symbolDataList: Array<IAssetsData>) {
        super();
        this.symbolTextureIdList = symbolDataList.map((symbolData) => {
            return symbolData.id;
        });
    }

    public initWidget(): void {
        for (let index = 0; index < this.MAX_SYMBOL_COUNT; index++) {
            this.setupSymbol(this.getRandomTextureName(), index);
        }
        this.setupMask();
    }

    public onRender(reelData: ReelData): void {
        switch (reelData.state) {
            case ReelState.IDLE:
                break;
            case ReelState.SPINNING:
                this.updateSymbolsPosition(reelData);
                break;
            case ReelState.STOPPING:
                this.updateSymbolsPosition(reelData);
                break;
        }
    }

    protected updateSymbolsPosition(reelData: ReelData): void {
        for (let index = 0; index < this.symbolList.length; index++) {
            let symbolSprite = this.symbolList[index];
            symbolSprite.y += this.SPINNING_SPEED;
        }
        if (this.needSymbolsUpdate()) {
            this.updateSymbolsOnReel();
            if (reelData.state === ReelState.STOPPING) {
                reelData.state = ReelState.IDLE;
            }
        }

    }

    protected needSymbolsUpdate(): boolean {
        let topSymbolSprite = this.symbolList[0];
        let offset = (this.CELL_HEIGHT - topSymbolSprite.height) / 2;
        let symbolPositionY = topSymbolSprite.y - offset;

        return symbolPositionY >= this.UPDATE_SYMBOLS_POSITION;
    }

    protected updateSymbolsOnReel(): void {
        let bottomSymbolSprite = this.symbolList.pop();
        this.removeChild(bottomSymbolSprite);

        this.setupSymbol(this.getRandomTextureName(), 0);
    }

    protected getRandomTextureName(): string {
        let randomIndex = Math.floor(Math.random() * 3);
        return this.symbolTextureIdList[randomIndex];
    }

    protected setupSymbol(textureId: string, index: number): void {
        let symbolSprite = Sprite.fromImage(textureId);
        let offset = (this.CELL_HEIGHT - symbolSprite.height) / 2;
        symbolSprite.y = (index - this.OFFSET_SYMBOLS_COUNT) * this.CELL_HEIGHT + offset;
        if (index === 0) {
            this.symbolList.unshift(symbolSprite);
        } else {
            this.symbolList.push(symbolSprite);
        }
        this.addChild(symbolSprite);
    }

    protected setupMask(): void {
        let mask = new Graphics().beginFill(0xFFFFFF).drawRect(0, 0, 1, 1).endFill();
        mask.width = this.width;
        mask.height = this.CELL_HEIGHT * this.VISIBLE_SYMBOL_COUNT;
        this.mask = mask;
        this.addChildAt(mask, 0);
    }
}