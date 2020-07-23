import { AbstractController } from "../../../../core/components/controllers/AbstractController";
import { CoreEvents } from "../../../../core/engine/modules/CoreEvents";
import { TemplateEvents } from "../../TemplateEvents";
import { BoyView } from "../views/BoyView";
import { TemplateGameModel } from "../../main/model/TemplateGameModel";
import { inject } from "../../../../core/injects/inject";
import { GameModel } from "../../../../core/engine/modules/game/model/GameModel";

export class BoyController extends AbstractController {
    protected gameModel: TemplateGameModel = inject(GameModel);
    protected view!: BoyView;

    protected initialize(): void {
        this.addListener(TemplateEvents.START_GAME, this.onStartGame);
        this.addListener(TemplateEvents.FINISH_GAME, this.onFinishGame);
        this.addListener(TemplateEvents.START_BOX_FLYING, this.onStartBoxFlyingAnimation);
        this.addListener(TemplateEvents.CLICK_AUTOPLAY_BUTTON, this.onClickAutoPlayButton);

        this.addViewListener(TemplateEvents.FINISH_BOX_FLYING, this.onFinishBoxFlyingAnimation);
        this.addViewListener(TemplateEvents.COLLIDE_BOX, this.onCollideBox);
    }

    protected onStartGame(): void {
        this.addListener(CoreEvents.ON_TOUCH_ANY_WHERE, this.onTouchAnyWhere);
        this.addListener(CoreEvents.ON_SPACE_KEY_PRESS, this.onTouchAnyWhere);
    }

    protected onFinishGame(): void {
        this.removeAllListeners();
        this.removeAllViewListeners();
        this.view.stopAnimations();
        this.view.startZoomAnimation();
    }

    protected onStartBoxFlyingAnimation(): void {
        this.view.startBoxFlyingAnimation();
    }

    protected onClickAutoPlayButton(): void {
        this.view.changeAutoPlayBehavior(this.gameModel.autoplay);
        if (this.gameModel.autoplay) {
            this.removeListener(CoreEvents.ON_TOUCH_ANY_WHERE);
            this.removeListener(CoreEvents.ON_SPACE_KEY_PRESS);
        } else {
            this.onStartGame();
        }
    }

    protected onFinishBoxFlyingAnimation(): void {
        this.dispatch(TemplateEvents.FINISH_BOX_FLYING)
    }

    protected onCollideBox(): void {
        this.removeAllListeners();
        this.removeAllViewListeners();
        this.dispatch(TemplateEvents.COLLIDE_BOX)
    }

    protected onTouchAnyWhere(): void {
        this.view.onTouchAnyWhere();
    }
}