import { Action } from "../../../../core/components/actions/Action";
import { TemplateEvents } from "../../TemplateEvents";
import { CoreEvents } from "../../../../core/engine/modules/CoreEvents";
import { TemplateGameModel } from "../model/TemplateGameModel";
import { inject } from "../../../../core/injects/inject";
import { GameModel } from "../../../../core/engine/modules/game/model/GameModel";

export class RestartMessageAction extends Action {
    protected gameModel: TemplateGameModel = inject(GameModel);

    protected onExecute(): void {
        this.addListener(TemplateEvents.CLICK_RESTART_BUTTON, this.onClickRestartButton);
    }

    protected onClickRestartButton(): void {
        this.gameModel.reset();
        this.dispatcher.dispatch(CoreEvents.REMOVE_SCENE, "gameScene");
        this.dispatcher.dispatch(CoreEvents.ADD_SCENE, "gameScene");
        this.onFinish();
    }
}