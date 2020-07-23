import { AbstractController } from "../../../../core/components/controllers/AbstractController";
import { TemplateEvents } from "../../TemplateEvents";
import { AutoPlayButtonSwitcherView } from "../views/AutoPlayButtonSwitcherView";
import { ButtonEventType } from "../../../../core/components/types/ButtonEventType";
import { ButtonViewType } from "../../../../core/components/types/ButtonViewType";
import { TemplateGameModel } from "../../main/model/TemplateGameModel";
import { inject } from "../../../../core/injects/inject";
import { GameModel } from "../../../../core/engine/modules/game/model/GameModel";

export class AutoPlayButtonController extends AbstractController {
    protected gameModel: TemplateGameModel = inject(GameModel);
    protected view!: AutoPlayButtonSwitcherView;

    protected initialize(): void {
        this.addListener(TemplateEvents.START_GAME, this.onStartGame);
        this.addListener(TemplateEvents.FINISH_GAME, this.onFinishGame);
        this.addListener(TemplateEvents.COLLIDE_BOX, this.onFinishGame);

        this.addViewListener(ButtonEventType.CLICK, this.onClickAutoPlayButton);
    }

    public onStartGame(): void {
        this.view.onChangeState(ButtonViewType.NORMAL);
    }

    public onFinishGame(): void {
        this.view.onChangeState(ButtonViewType.DISABLE);
        this.view.interactive = false;
        this.removeAllViewListeners();
        this.removeAllListeners();
    }

    public onClickAutoPlayButton(): void {
        this.gameModel.autoplay = !this.gameModel.autoplay;
        this.view.setType(this.gameModel.autoplay ? "off" : "on");
        this.dispatch(TemplateEvents.CLICK_AUTOPLAY_BUTTON)
    }
}