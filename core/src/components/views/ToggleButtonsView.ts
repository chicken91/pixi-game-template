import { ButtonEventType } from '../types/ButtonEventType';
import { isNullOrUndefined } from "util";
import { ButtonView } from "./ButtonView";
import { ContainerView } from "./ContainerView";
import { ButtonViewType } from "../types/ButtonViewType";

export class ToggleButtonsView extends ContainerView {
    protected _buttons: ButtonView[] = [];
    protected _callbacks: { [id: number]: Function } = {};
    protected _selectedButtonIndex!: number;

    public onAdded(): void {
        super.onAdded();
        this.interactive = true;
        this.buttonMode = true;
        if (isNullOrUndefined(this._selectedButtonIndex)) {
            this.selectButton(this._buttons[0]);
        }
    }

    public addButton(button: ButtonView): void {
        this._buttons.push(button);
        this.addChild(button);

        button.on(ButtonEventType.CLICK, this.selectButton.bind(this));
    }

    public selectButton(selectedButton: ButtonView): void {
        this._selectedButtonIndex = this._buttons.indexOf(selectedButton);
        this._buttons.forEach((button: ButtonView) => {
            if (button !== selectedButton) {
                button.onChangeState(ButtonViewType.NORMAL);
            } else {
                button.onChangeState(ButtonViewType.DOWN);
            }
        });

        if (this._callbacks[this._selectedButtonIndex]) {
            this._callbacks[this._selectedButtonIndex]();
        }
    }

    public setCallback(id: number, callback: Function): void {
        this._callbacks[id] = callback;
    }

    public enable(value: boolean = true): void {
        this.interactiveChildren = value;
        if (value) {
            this.filters = [];
        } else {
            const colorMatrix = new PIXI.filters.ColorMatrixFilter();
            this.filters = [colorMatrix];
            colorMatrix.greyscale(0.3, false);
        }
    }

    public destroy() {
        if (this._buttons) {
            this._buttons.forEach((button) => {
                button.destroy();
            });
        }
        this._buttons = [];
        super.destroy();
    }
}