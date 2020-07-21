import { ScreenModel } from '../model/ScreenModel';
import { inject } from '../../../../injects/inject';
import { TimeUtils } from "../../../../utils/TimeUtils";

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