import { GroupContainerView } from "../../../../core/components/views/GroupContainerView";
import { TemplateEvents } from "../../TemplateEvents";
import { TextView } from "../../../../core/components/views/TextView";


export class MainView extends GroupContainerView {
    protected tapToStartText!: TextView;
    protected youLoseText!: TextView;
    protected youFinishText!: TextView;
    protected restartText!: TextView;

    public onAdded(): void {
        super.onAdded();
        this.restartText.on("pointertap", this.onClickRestartButton.bind(this));
    }

    public showRestartMessageText(): void {
        this.restartText.interactive = true;
        this.restartText.visible = true;
        this.youLoseText.visible = true;
    }

    public showFinishMessageText(): void {
        this.restartText.interactive = true;
        this.restartText.visible = true;
        this.youFinishText.visible = true;
    }

    public hideTapToStartText(): void {
        this.tapToStartText.visible = false;
    }

    public onClickRestartButton(): void {
        this.restartText.interactive = false;
        this.emit(TemplateEvents.CLICK_RESTART_BUTTON);
    }
}