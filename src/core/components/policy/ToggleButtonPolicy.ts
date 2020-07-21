import { ButtonPolicy } from './ButtonPolicy';

export class ToggleButtonPolicy extends ButtonPolicy {
    protected onButtonDown(): void {
        this._clickStarted = true;
    }

    protected onButtonUp(): void {
        this.makeClick();
    }

    protected onButtonOver(): void {

    }

    protected onButtonOut(): void {

    }
}