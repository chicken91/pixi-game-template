import { GroupContainerView } from "../../../../core/src/components/views/GroupContainerView";
import { SpineView } from "../../../../core/src/components/views/SpineView";
import { CoreEvents } from "../../../../core/src/engine/modules/CoreEvents";
import { viewMapping } from "../../../../core/src/injects/inject";
import TrackEntry = PIXI.spine.core.TrackEntry;

@viewMapping('mainView')
export class MainView extends GroupContainerView {
    protected boySpine!: SpineView;

    public onAdded(): void {
        super.onAdded();
        this.addEventListener(CoreEvents.ON_TOUCH_ANY_WHERE, this.onTouchAnyWhere);
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