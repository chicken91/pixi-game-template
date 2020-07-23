import { Action } from "../../../../core/components/actions/Action";
import { TemplateEvents } from "../../TemplateEvents";
import { TimeUtils } from "../../../../core/utils/TimeUtils";
import { TemplateGameModel } from "../../main/model/TemplateGameModel";
import { inject } from "../../../../core/injects/inject";
import { GameModel } from "../../../../core/engine/modules/game/model/GameModel";

export class BoxAction extends Action {
    protected gameModel: TemplateGameModel = inject(GameModel);

    protected onExecute(): void {
        this.addListener(TemplateEvents.FINISH_BOX_FLYING, this.addBoxFlyingTimer);
        this.addListener(TemplateEvents.COLLIDE_BOX, this.onCollideBox);
        this.addBoxFlyingTimer();
    }

    protected addBoxFlyingTimer(): void {
        if (this.gameModel.checkRemainingTime()) {
            TimeUtils.addTimer(this.invokeBoxFlying.bind(this), this.getRandomIntervalTime());
        } else {
            this.dispatcher.dispatch(TemplateEvents.FINISH_GAME);
            this.onFinish();
        }
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