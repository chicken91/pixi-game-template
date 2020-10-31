import { GroupContainerView } from "../../../../../components/views/GroupContainerView";
import { GraphicsView } from "../../../../../components/views/GraphicsView";
import { TextView } from "../../../../../components/views/TextView";
import { CoreEvents } from "../../../CoreEvents";
import { viewMapping } from "../../../../../injects/inject";

@viewMapping('progressBarView')
export class ProgressBarView extends GroupContainerView {
    protected bar!: GraphicsView;
    protected barMask!: GraphicsView;
    protected progressBar!: GraphicsView;
    protected progressText!: TextView;

    public onAdded(): void {
        super.onAdded();
        this.addEventListener(CoreEvents.INITIAL_ASSETS_PROGRESS, this.onInitialAssetsProgress);
        this.progressText.widget.text = "0%";
        this.progressBar.mask = this.barMask.widget;
    }

    public onInitialAssetsProgress(progress: number): void {
        this.progressBar.widget.x = this.progressBar.widget.width * progress;
        this.progressText.widget.text = (100 * progress).toFixed(0) + "%";
    }
}