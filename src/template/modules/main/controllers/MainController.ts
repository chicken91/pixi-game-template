import { AbstractController } from "../../../../core/components/controllers/AbstractController";
import { MainView } from "../views/MainView";
import { TemplateEvents } from "../../TemplateEvents";

export class MainController extends AbstractController {
    protected view!: MainView;

    protected initialize(): void {
        this.addListener(TemplateEvents.START_GAME, this.onStartGame);
        this.addListener(TemplateEvents.FINISH_GAME, this.onFinishGame);
        this.addListener(TemplateEvents.COLLIDE_BOX, this.onCollideBox);

        this.addViewListener(TemplateEvents.CLICK_RESTART_BUTTON, this.onClickRestartButton);
    }

    protected onStartGame(): void {
        this.view.hideTapToStartText();
    }

    protected onFinishGame(): void {
        this.view.showFinishMessageText();
    }

    protected onCollideBox(): void {
        this.view.showRestartMessageText();
    }

    protected onClickRestartButton(): void {
        this.dispatch(TemplateEvents.CLICK_RESTART_BUTTON);
    }
}