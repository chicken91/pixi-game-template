import { WidgetView } from "./WidgetView";
import Text = PIXI.Text;
import Graphics = PIXI.Graphics;

export class TextView extends WidgetView<Text> {
    private _textArea!: Graphics;

    constructor() {
        super(new Text(""));
    }

    public onResize(width?: number, height?: number): void {
        if (this._textArea) {
            const widgetWidth: number = Math.floor(this.widget.width);
            if (this._textArea.width < widgetWidth) {
                let scale: number = this._textArea.width / widgetWidth;
                this.widget.scale.set(scale, scale);
            }
            const widgetHeight: number = Math.floor(this.widget.height);
            if (this._textArea.height < widgetHeight) {
                let scale: number = this._textArea.height / widgetHeight;
                this.widget.scale.set(scale, scale);
            }

            this.widget.pivot.set((this.widget.width / 2) / this.widget.scale.x, (this.widget.height / 2) / this.widget.scale.y);
            this.widget.position.set(this._textArea.width / 2, this._textArea.height / 2);
        }
        super.onResize(width, height);
    }

    public setTextAreaSize(width: number, height: number): void {
        this._textArea = new Graphics();
        this._textArea.beginFill(0xFF0000).drawRect(0, 0, width, height).endFill();
        this._textArea.alpha = 0;
        this.addChildAt(this._textArea, 0);
    }

    public debugTextArea(): void {
        if (this._textArea) {
            this._textArea.alpha = 1;
        }
    }
}