import { ButtonView } from "../../../../core/components/views/ButtonView";
import { ButtonViewType } from "../../../../core/components/types/ButtonViewType";
import { TextView } from "../../../../core/components/views/TextView";

export class AutoPlayButtonSwitcherView extends ButtonView {
    protected type: string = "on";

    public onAdded(): void {
        super.onAdded();
        this.onChangeState(ButtonViewType.DISABLE);
        this.visible = true;
        this.interactive = false;
    }

    public setCurrencyText(currencyText: string) {
        for (let state in this.stateComponents) {
            if (state && state.includes("on")) {
                for (let component of this.stateComponents[state]) {
                    let textComponent: TextView = <TextView>component;
                    if (textComponent.widget.text) {
                        textComponent.widget.text = currencyText;
                    }
                }
            }
        }
    }

    public setType(type: string): void {
        this.type = type;
        this.onChangeState(ButtonViewType.NORMAL);
    }

    public onChangeState(state: string, force: boolean = false): void {
        super.onChangeState(`${state}_${this.type}`, force);
    }
}