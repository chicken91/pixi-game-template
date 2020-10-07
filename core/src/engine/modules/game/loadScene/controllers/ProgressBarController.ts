import { ProgressBarView } from "../views/ProgressBarView";
import { AbstractController } from "../../../../../components/controllers/AbstractController";
import { CoreEvents } from "../../../CoreEvents";

export class ProgressBarController extends AbstractController {
    protected view!: ProgressBarView;

    protected initialize(): void {
        this.addListener(CoreEvents.INITIAL_ASSETS_PROGRESS, this.onInitialAssetsProgress.bind(this));
    }

    protected onInitialAssetsProgress(progress: number): void {
        this.view.onChangeLoadingProgress(progress);
    }
}