import { SoundActionType } from "../types/SoundActionType";
import { AbstractSound } from "../entity/AbstractSound";
import { SoundAction } from "../actions/SoundAction";
import { EventDispatcher } from "../../../../components/events/EventDispatcher";
import { inject } from "../../../../injects/inject";
import { GlobalVolumeAction } from "../actions/GlobalVolumeAction";
import { SoundVolumeAction } from "../actions/SoundVolumeAction";
import { PlaySoundAction } from "../actions/PlaySoundAction";
import { SoundModel } from "../models/SoundModel";
import { FadeSoundAction } from "../actions/FadeSoundAction";

export abstract class AbstractSoundManager {
    protected dispatcher: EventDispatcher = inject(EventDispatcher);
    protected soundModel: SoundModel = inject(SoundModel);

    protected changeGlobalVolume(soundAction: GlobalVolumeAction): void {
        this.soundModel.setVolumeSound(soundAction.volume);
    }

    protected onActionExecute(soundAction: SoundAction): void {
        switch (soundAction.type) {
            case SoundActionType.PLAY_SOUND:
                this.playSound(<PlaySoundAction>soundAction);
                break;
            case SoundActionType.STOP_SOUND:
                this.stopSound(soundAction.id);
                break;
            case SoundActionType.CHANGE_SOUND_VOLUME:
                this.changeSoundVolume(<SoundVolumeAction>soundAction);
                break;
            case SoundActionType.CHANGE_GLOBAL_VOLUME:
                this.changeGlobalVolume(<GlobalVolumeAction>soundAction);
                break;
            case SoundActionType.FADE_SOUND:
                this.fadeSound(<FadeSoundAction>soundAction);
                break;
            default:
                console.error(`No sound action type ${soundAction.type}`);
        }
    }

    protected playSound(soundAction: PlaySoundAction): void {
        let sound: AbstractSound = this.soundModel.getSoundById(soundAction.id);
        if (sound) {
            sound.play(soundAction);
            console.log(`Play sound [${soundAction.id}] [${sound.id}]`);
        }
    }

    protected stopSound(id: string): void {
        let sound: AbstractSound = this.soundModel.getSoundById(id);
        if (sound) {
            sound.stop();
        }
    }

    protected changeSoundVolume(soundAction: SoundVolumeAction): void {
        let sound: AbstractSound = this.soundModel.getSoundById(soundAction.id);
        if (sound) {
            sound.volume(soundAction.volume);
        }
    }

    protected fadeSound(soundAction: FadeSoundAction): void {
        let sound: AbstractSound = this.soundModel.getSoundById(soundAction.id);
        if (sound) {
            sound.fade(soundAction);
        }
    }
}