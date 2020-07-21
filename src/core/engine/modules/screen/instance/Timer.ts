export class Timer {
    private _callback;
    private _timerId;
    private _startTime;
    private _remaining;

    constructor(callback, delay) {
        this._callback = callback;
        this._remaining = delay;
        this.resume();
    }

    public pause() {
        window.clearTimeout(this._timerId);
        this._remaining -= Date.now() - this._startTime;
    };

    public resume() {
        this._startTime = Date.now();
        window.clearTimeout(this._timerId);
        this._timerId = window.setTimeout(this._callback, this._remaining);
    };

    public clear() {
        window.clearTimeout(this._timerId);
    }
}