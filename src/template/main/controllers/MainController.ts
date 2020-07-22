import { AbstractController } from "../../../core/components/controllers/AbstractController";
import { CoreEvents } from "../../../core/engine/modules/CoreEvents";
import { MainView } from "../views/MainView";
import { TemplateEvents } from "../../TemplateEvents";

export class MainController extends AbstractController {
    protected view!: MainView;

    protected initialize(): void {
        this.addListener(TemplateEvents.START_GAME, this.onStartGame);
        this.addListener(TemplateEvents.START_BOX_FLYING, this.onStartBoxFlyingAnimation);

        this.addViewListener(TemplateEvents.FINISH_BOX_FLYING, this.onFinishBoxFlyingAnimation);
        this.addViewListener(TemplateEvents.COLLIDE_BOX, this.onCollideBox);
    }

    protected onStartGame(): void {
        this.addListener(CoreEvents.ON_TOUCH_ANY_WHERE, this.onTouchAnyWhere);
        this.addListener(CoreEvents.ON_SPACE_KEY_PRESS, this.onTouchAnyWhere);
    }

    protected onStartBoxFlyingAnimation(): void {
        this.view.startBoxFlyingAnimation();
    }

    protected onFinishBoxFlyingAnimation(): void {
        this.dispatch(TemplateEvents.FINISH_BOX_FLYING)
    }

    protected onCollideBox(): void {
        this.removeListener(CoreEvents.ON_TOUCH_ANY_WHERE);
        this.removeListener(CoreEvents.ON_SPACE_KEY_PRESS);
        this.dispatch(TemplateEvents.COLLIDE_BOX)
    }

    protected onTouchAnyWhere(): void {
        this.view.onTouchAnyWhere();
    }
}