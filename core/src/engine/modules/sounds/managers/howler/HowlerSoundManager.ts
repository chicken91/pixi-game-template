import { AbstractSoundManager } from "../AbstractSoundManager";
import { CoreEvents } from "../../../CoreEvents";
import { Howler } from "howler";
import { bind } from "../../../../../injects/inject";
import { CreationPriority } from "../../../../../injects/CreationPriority";

@bind({bind: AbstractSoundManager, priority: CreationPriority.HIGH, singleton: true})
export class HowlerSoundManager extends AbstractSoundManager {

    constructor() {
        super();
        this.addListeners();
    }

    protected addListeners(): void {
        this.dispatcher.addListener(CoreEvents.SOUND_ACTION, this.onActionExecute.bind(this));
        this.dispatcher.addListener(CoreEvents.LOSE_GAME_FOCUS, this.onLostFocus.bind(this));
        this.dispatcher.addListener(CoreEvents.RECOVER_GAME_FOCUS, this.onRecoverFocus.bind(this));
    }

    protected onRecoverFocus(): void {
        setTimeout(this.howlerResumeInvoke.bind(this), 1000);
    }

    protected onLostFocus(): void {
        if (Howler.ctx) {
            Howler.ctx.suspend();
        }
    }

    protected howlerResumeInvoke(): void {
        if (Howler.ctx && (<any>Howler.ctx.state === "interrupted" || <any>Howler.ctx.state === "suspended")) {
            Howler.ctx.resume();
        }
    }
}