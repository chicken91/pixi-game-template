import { GroupContainerView } from "../../../core/components/views/GroupContainerView";
import { SpineView } from "../../../core/components/views/SpineView";
import TrackEntry = PIXI.spine.core.TrackEntry;


export class MainView extends GroupContainerView {
    protected boySpine!: SpineView;

    public onAdded(): void {
        super.onAdded();
        this.boySpine.startAnimation("idle", true);
    }

    public onTouchAnyWhere(): void {
        const currentTrackEntry: TrackEntry = this.boySpine.widget.state.getCurrent(0);
        if (currentTrackEntry.animation.name !== "jump" || currentTrackEntry.isComplete()) {
            this.boySpine.stopAnimation();
            this.boySpine.startAnimation("jump", false).then(() => {
                this.boySpine.startAnimation("idle", true);
            });
        }
    }
}