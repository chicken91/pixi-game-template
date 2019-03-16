import {EventType} from "../../../common/type/EventType";
import {BaseController} from "../../../common/components/BaseController";
import {TimeConstants} from "../../constants";


export class ReelController extends BaseController {

    protected addListeners(): void {
        this.addListener(EventType.START_REEL_SPIN, this.onStartReelSpin.bind(this));
    }

    private onStartReelSpin() {
        setTimeout(this.onStopReelSpin.bind(this), TimeConstants.reelSpinTime);
    }

    private onStopReelSpin(): void {
        this.dispatcher.dispatch(EventType.STOP_REEL_SPIN);
    }
}