import { ButtonPolicy } from './ButtonPolicy';
import { bind } from "../../injects/inject";

@bind()
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