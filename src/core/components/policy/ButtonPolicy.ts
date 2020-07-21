import { ButtonEventType } from '../types/ButtonEventType';
import { ButtonViewType } from '../types/ButtonViewType';
import { ButtonView } from "../views/ButtonView";
import { Point } from "pixi.js";
import InteractionEvent = PIXI.interaction.InteractionEvent;

export class ButtonPolicy {
    protected readonly START_MOVING_DELTA = 15;
    protected _object!: ButtonView;
    protected _clickStarted: boolean = false;
    protected _moving: boolean = false;
    protected _startMovingPoint: Point = new Point(0, 0);
    protected _deltaVector: Point = new Point(0, 0);

    protected setListeners(): void {
        this._object.addListener('pointerdown', this.onButtonDown, this)
            .addListener('pointerup', this.onButtonUp, this)
            .addListener('pointerupoutside', this.onPointerUpOutside, this)
            .addListener('pointerover', this.onButtonOver, this)
            .addListener('pointerout', this.onButtonOut, this);
        if (this._object.movable) {
            this._object.addListener('touchmove', this.onButtonMove, this);
        }
    }

    protected onButtonDown(event): void {
        event.stopPropagation();
        this._clickStarted = true;
        this._object.emit(ButtonEventType.CHANGE_STATE, ButtonViewType.DOWN);
    }


    protected onButtonUp(event): void {
        event.stopPropagation();
        this._moving = false;
        this._object.emit(ButtonEventType.CHANGE_STATE, ButtonViewType.NORMAL);
        this.makeClick();
    }

    protected makeClick(): void {
        if (this._clickStarted) {
            this._object.emit(ButtonEventType.CLICK, this._object);
        }
        this._clickStarted = false;
        this._startMovingPoint.set(0, 0);
    }

    protected onButtonOver(): void {
        this._object.emit(ButtonEventType.CHANGE_STATE, ButtonViewType.OVER);
    }

    protected onButtonOut(): void {
        this._object.emit(ButtonEventType.CHANGE_STATE, ButtonViewType.NORMAL);
    }

    protected onPointerUpOutside(): void {
        this.onButtonOut();
        this._clickStarted = false;
        this._startMovingPoint.set(0, 0);
    }

    protected onButtonMove(event: InteractionEvent): void {
        if (!this._moving && this._clickStarted) {
            if (event.target === event.currentTarget) {
                this.updateMovingVector(event);
                if (this.getMovingVectorSize() > this.START_MOVING_DELTA) {
                    this._clickStarted = false;
                    this._moving = true;
                    this._startMovingPoint.set(0, 0);
                    this._object.emit(ButtonEventType.CHANGE_STATE, ButtonViewType.NORMAL);
                }

            } else {
                this.onPointerUpOutside();
            }
        }

        if (this._moving) {
            this._object.emit(ButtonEventType.MOVE, event);
        }
    }

    protected updateMovingVector(event: InteractionEvent): void {
        if (this._startMovingPoint.x === 0 && this._startMovingPoint.y === 0) {
            this._startMovingPoint.set(event.data.global.x, event.data.global.y);
        }
        this._deltaVector.set(
            event.data.global.x - this._startMovingPoint.x,
            event.data.global.y - this._startMovingPoint.y
        );
    }

    protected getMovingVectorSize(): number {
        return Math.sqrt(this._deltaVector.x * this._deltaVector.x + this._deltaVector.y * this._deltaVector.y);
    }

    public setObject(object: ButtonView): void {
        if (this._object) {
            console.error('ButtonPolicy object already set');
        }
        this._object = object;
        this.setListeners();
    }

    public destroy(): void {
        this._object.removeListener('pointerdown', this.onButtonDown, this)
            .removeListener('pointerup', this.onButtonUp, this)
            .removeListener('pointerupoutside', this.onPointerUpOutside, this)
            .removeListener('pointerover', this.onButtonOver, this)
            .removeListener('pointerout', this.onButtonOut, this)
            .removeListener('touchmove', this.onButtonMove, this);
    }
}