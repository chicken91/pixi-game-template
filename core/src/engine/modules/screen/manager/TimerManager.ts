import { ScreenModel } from '../model/ScreenModel';
import { bind, inject } from '../../../../injects/inject';
import { TimeUtils } from "../../../../utils/TimeUtils";
import { CreationPriority } from "../../../../injects/CreationPriority";

@bind({singleton: true, priority: CreationPriority.VERY_HIGH})
export class TimerManager {
    protected screenModel: ScreenModel = inject(ScreenModel);

    constructor() {
        this.screenModel.observeProperty('isFocused', this.onChangeFocus, this)
    }

    protected onChangeFocus(value: boolean): void {
        if (value) {
            TimeUtils.resumeTimers();
        } else {
            TimeUtils.pauseTimers();
        }
    }
}