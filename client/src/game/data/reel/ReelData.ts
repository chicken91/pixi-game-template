import {ReelState} from "../../../common/type/ReelState";

export class ReelData {
    private _state: number = ReelState.IDLE;

    public get state(): number {
        return this._state;
    }

    public set state(value: number) {
        this._state = value;
    }
}