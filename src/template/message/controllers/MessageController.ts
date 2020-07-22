import { AbstractController } from "../../../core/components/controllers/AbstractController";
import { TemplateEvents } from "../../TemplateEvents";
import { MessageView } from "../views/MessageView";

export class MessageController extends AbstractController {
    protected view!: MessageView;

    protected initialize(): void {
        this.addListener(TemplateEvents.START_GAME, this.onStartGame);
        this.addListener(TemplateEvents.COLLIDE_BOX, this.onCollideBox);

        this.addViewListener(TemplateEvents.CLICK_RESTART_BUTTON, this.onClickRestartButton);
    }

    protected onStartGame(): void {
        this.view.hideTapToStartText();
    }

    protected onCollideBox(): void {
        this.view.showRestartMessageText();
    }

    protected onClickRestartButton(): void {
        this.dispatch(TemplateEvents.CLICK_RESTART_BUTTON);
    }
}