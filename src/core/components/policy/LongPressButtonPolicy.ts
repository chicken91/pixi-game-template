import { ButtonEventType } from '../types/ButtonEventType';
import { ButtonPolicy } from './ButtonPolicy';

export class LongPressButtonPolicy extends ButtonPolicy {
    public readonly LONG_PRESS_TIME: number = 200;

    protected longPressTimeout: number = 0;
    protected longPressStarted: boolean = false;

    protected onButtonDown(e: Event): void {
        super.onButtonDown(e);
        this.longPressTimeout = window.setTimeout(this.onLongPressStart.bind(this), this.LONG_PRESS_TIME);
    }

    protected onLongPressStart(): void {
        this.longPressStarted = true;
        this._object.emit(ButtonEventType.LONG_PRESS_START);
    }

    protected makeClick(): void {
        if (this.longPressStarted) {
            this.onLongPressCompleted();
        } else {
            this.clearLongPressTimeout();
            super.makeClick();
        }
    }

    protected clearLongPressTimeout(): void {
        if (this.longPressTimeout) {
            window.clearTimeout(this.longPressTimeout);
            this.longPressTimeout = 0;
        }
    }

    protected onLongPressCompleted(): void {
        this.clearLongPressTimeout();
        if (this.longPressStarted) {
            this._object.emit(ButtonEventType.LONG_PRESS_END);
        }
        this.longPressStarted = false;
    }

    protected onButtonOut(): void {
        super.onButtonOut();
        this.onLongPressCompleted();
    }

    protected onButtonMove(event: PIXI.interaction.InteractionEvent): void {
        super.onButtonMove(event);
        if (this._moving) {
            this.onLongPressCompleted();
        }
    }
}