import Container = PIXI.Container;
import Sprite = PIXI.Sprite;
import Graphics = PIXI.Graphics;
import {IAssetsData} from "../../../../../common/type/interfaces/IAssetsData";
import {ReelState} from "../../../../../common/type/ReelState";

export class ReelWidget extends Container {
    protected readonly MAX_SYMBOL_COUNT: number = 7;
    protected readonly VISIBLE_SYMBOL_COUNT: number = 3;
    protected readonly OFFSET_SYMBOLS_COUNT: number = (this.MAX_SYMBOL_COUNT - this.VISIBLE_SYMBOL_COUNT) / 2;
    protected readonly CELL_HEIGHT: number = 200;
    protected readonly UPDATE_SYMBOLS_POSITION: number = -this.CELL_HEIGHT * (this.OFFSET_SYMBOLS_COUNT - 1);
    protected readonly SPINNING_SPEED: number = 15;

    protected symbolTextureIdList: Array<string> = [];
    protected symbolList: Array<Sprite> = [];
    protected onStopCallback: () => void;

    constructor(symbolDataList: Array<IAssetsData>) {
        super();
        this.symbolTextureIdList = symbolDataList.map((symbolData) => {
            return symbolData.id;
        });
    }

    public initWidget(onStopCallback: () => void): void {
        for (let index = 0; index < this.MAX_SYMBOL_COUNT; index++) {
            this.setupSymbol(this.getRandomTextureName(), index);
        }
        this.setupMask();
        this.onStopCallback = onStopCallback;
    }

    public onRender(reelState: number): void {
        switch (reelState) {
            case ReelState.IDLE:
                break;
            case ReelState.SPINNING:
                this.updateSymbolsPosition(reelState);
                break;
            case ReelState.STOPPING:
                this.updateSymbolsPosition(reelState);
                break;
        }
    }

    protected updateSymbolsPosition(reelState: number): void {
        for (let index = 0; index < this.symbolList.length; index++) {
            let symbolSprite = this.symbolList[index];
            symbolSprite.y += this.SPINNING_SPEED;
        }
        if (this.needSymbolsUpdate()) {
            this.updateSymbolsOnReel();
            if (reelState === ReelState.STOPPING) {
                this.onStopCallback();
            }
        }

    }

    protected needSymbolsUpdate(): boolean {
        let topSymbolSprite = this.symbolList[0];
        let offset = this.getSymbolOffset(topSymbolSprite);
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

    protected addCorrectSymbolOffset(firstSymbolSprite: Sprite): void {
        let firstVisibleSymbolSprite = this.symbolList[this.OFFSET_SYMBOLS_COUNT];
        if (firstVisibleSymbolSprite) {
            let offset = this.getSymbolOffset(firstVisibleSymbolSprite);
            let correctOffset = firstVisibleSymbolSprite.y - offset;
            firstSymbolSprite.y += correctOffset;
        }
    }

    protected setupSymbol(textureId: string, index: number): void {
        let symbolSprite = Sprite.fromImage(textureId);
        let offset = this.getSymbolOffset(symbolSprite);
        symbolSprite.y = (index - this.OFFSET_SYMBOLS_COUNT) * this.CELL_HEIGHT + offset;
        if (index === 0) {
            this.symbolList.unshift(symbolSprite);
            this.addCorrectSymbolOffset(symbolSprite);
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

    protected getSymbolOffset(symbolSprite: Sprite): number {
        return (this.CELL_HEIGHT - symbolSprite.height) / 2;
    }
}