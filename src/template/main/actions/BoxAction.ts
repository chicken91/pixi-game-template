import { Action } from "../../../core/components/actions/Action";
import { TemplateEvents } from "../../TemplateEvents";
import { TimeUtils } from "../../../core/utils/TimeUtils";

export class BoxAction extends Action {

    protected onExecute(): void {
        this.addListener(TemplateEvents.FINISH_BOX_FLYING, this.addBoxFlyingTimer);
        this.addListener(TemplateEvents.COLLIDE_BOX, this.onCollideBox);
        this.addBoxFlyingTimer();
    }

    protected addBoxFlyingTimer(): void {
        TimeUtils.addTimer(this.invokeBoxFlying.bind(this), this.getRandomIntervalTime());
    }

    protected invokeBoxFlying(): void {
        this.dispatcher.dispatch(TemplateEvents.START_BOX_FLYING);
    }

    protected onCollideBox(): void {
        this.onFinish();
    }

    protected getRandomIntervalTime(): number {
        return (Math.random() * 3 + 1) * 1000;
    }

}