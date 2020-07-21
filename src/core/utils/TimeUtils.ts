import { Timer } from "../engine/modules/screen/instance/Timer";

export class TimeUtils {
    protected static _timers: Array<Timer> = [];

    public static addTimer(handler, timeout): Timer {
        const timer = new Timer(() => {
            this.removeTimer(timer);
            handler();
        }, timeout);
        this._timers.push(timer);
        return timer;
    }

    public static removeTimer(timer: Timer): void {
        const index = this._timers.indexOf(timer);
        if (index !== -1) {
            this._timers[index].clear();
            this._timers.splice(index, 1);
        }
    }

    public static resumeTimers(): void {
        this._timers.forEach(timer => timer.resume());
    }

    public static pauseTimers(): void {
        this._timers.forEach(timer => timer.pause());
    }
}