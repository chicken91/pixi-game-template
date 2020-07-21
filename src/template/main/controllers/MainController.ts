import { AbstractController } from "../../../core/components/controllers/AbstractController";
import { CoreEvents } from "../../../core/engine/modules/CoreEvents";
import { MainView } from "../views/MainView";

export class MainController extends AbstractController {
    protected view!: MainView;

    protected initialize(): void {
        this.addListener(CoreEvents.ON_TOUCH_ANY_WHERE, this.onTouchAnyWhere.bind(this));
    }

    protected onTouchAnyWhere(): void {
        this.view.onTouchAnyWhere();
    }
}