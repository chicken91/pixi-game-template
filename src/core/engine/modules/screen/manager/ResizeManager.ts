import { EventDispatcher } from "../../../../components/events/EventDispatcher";
import { inject } from "../../../../injects/inject";
import { RenderManager } from "./RenderManager";
import { ScreenModel } from "../model/ScreenModel";
import { CoreEvents } from "../../CoreEvents";
import { isNullOrUndefined } from "util";
import { CoreConstants } from "../../CoreConstants";

export class ResizeManager {
    protected dispatcher: EventDispatcher = inject(EventDispatcher);
    protected renderManager: RenderManager = inject(RenderManager);
    protected screenModel: ScreenModel = inject(ScreenModel);

    constructor() {
        this.addListeners();
        this.invokeResize();
        this.screenModel.calculateDPI();

        if (CoreConstants.deviceType.MOBILE && !CoreConstants.deviceType.IOS) {
            document.body.addEventListener('click', this.enableFullScreen.bind(this));
            document.body.addEventListener('touchstart', this.enableFullScreen.bind(this));
        }
    }

    protected addListeners(): void {
        window.addEventListener("resize", this.onResize.bind(this));
        this.dispatcher.addListener(CoreEvents.REQUEST_CHANGE_FULL_SCREEN, this.requestChangeFullScreen.bind(this));
    }

    protected onResize() {
        if (CoreConstants.deviceType.MOBILE) {
            window.setTimeout(this.invokeResize.bind(this), 250);
        } else {
            this.invokeResize();
        }
    }

    protected invokeResize(): void {
        this.screenModel.setSize(window.innerWidth, window.innerHeight);
        this.renderManager.resizeCanvas(this.screenModel.size.width, this.screenModel.size.height);
        this.dispatcher.dispatch(CoreEvents.RESIZE, this.screenModel.size);
    }

    protected requestChangeFullScreen() {
        const doc = window.document as any;

        this.screenModel.fullScreen = !(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement);

        if (this.screenModel.fullScreen) {
            this.exitFullScreen();
        } else {
            this.enableFullScreen();
        }
    }

    protected enableFullScreen(): void {
        const doc = window.document as any;
        const docBody = document.body as any;
        if (docBody.requestFullscreen && isNullOrUndefined(doc.fullscreenElement)) {
            docBody.requestFullscreen();
            this.onChangeFullScreen(true);
        } else if (docBody.mozRequestFullScreen) { /* Firefox */
            docBody.mozRequestFullScreen();
            this.onChangeFullScreen(true);
        } else if (docBody.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
            docBody.webkitRequestFullscreen();
            this.onChangeFullScreen(true);
        } else if (docBody.msRequestFullscreen) { /* IE/Edge */
            docBody.msRequestFullscreen();
            this.onChangeFullScreen(true);
        }
    }

    protected exitFullScreen(): void {
        let doc = document as any;
        if (doc.exitFullscreen) {
            doc.exitFullscreen();
            this.onChangeFullScreen(false);
        } else if (doc.mozCancelFullScreen) { /* Firefox */
            doc.mozCancelFullScreen();
            this.onChangeFullScreen(false);
        } else if (doc.webkitCancelFullScreen) { /* Chrome, Safari and Opera */
            doc.webkitCancelFullScreen();
            this.onChangeFullScreen(false);
        } else if (doc.msExitFullscreen) { /* IE/Edge */
            doc.msExitFullscreen();
            this.onChangeFullScreen(false);
        } else if (doc.msCancelFullScreen) { /* IE/Edge */
            doc.msCancelFullScreen();
            this.onChangeFullScreen(false);
        }
    }

    protected onChangeFullScreen(fullscreen: boolean) {
        this.screenModel.changeFullScreenMode(fullscreen);
        this.dispatcher.dispatch(CoreEvents.FULL_SCREEN_CHANGED);
    }
}




