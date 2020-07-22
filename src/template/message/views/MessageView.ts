import { GroupContainerView } from "../../../core/components/views/GroupContainerView";
import { TextView } from "../../../core/components/views/TextView";
import { TemplateEvents } from "../../TemplateEvents";


export class MessageView extends GroupContainerView {
    protected tapToStartText!: TextView;
    protected youLoseText!: TextView;
    protected restartText!: TextView;

    public onAdded(): void {
        super.onAdded();
        this.restartText.on("click", this.onClickRestartButton.bind(this));
    }

    public showRestartMessageText(): void {
        this.restartText.interactive = true;
        this.restartText.visible = true;
        this.youLoseText.visible = true;
    }

    public hideTapToStartText(): void {
        this.tapToStartText.visible = false;
    }

    public onClickRestartButton(): void {
        this.restartText.interactive = false;
        this.emit(TemplateEvents.CLICK_RESTART_BUTTON);
    }

}