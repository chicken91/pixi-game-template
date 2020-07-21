import { Back, Linear, Sine, TweenLite } from 'gsap';
import DisplayObject = PIXI.DisplayObject;
import Container = PIXI.Container;

export class GreyFilter {
    private static _colorMatrixFilter = new PIXI.filters.ColorMatrixFilter();

    public static setFilterState(component: Container, enable: boolean, config: GreyFilterConfig): void {

        if (enable) {
            this._colorMatrixFilter.greyscale(config.greyScale, false);
            this._colorMatrixFilter.alpha = config.initialAlpha;
            this._colorMatrixFilter.resolution = window.devicePixelRatio;
            component.filters = [this._colorMatrixFilter];
            TweenLite.killTweensOf(this._colorMatrixFilter);
            TweenLite.to(this._colorMatrixFilter, config.animationSpeed, {
                alpha: config.finalAlpha,
                ease: Sine.easeOut
            });
        } else {
            TweenLite.killTweensOf(this._colorMatrixFilter);
            TweenLite.to(this._colorMatrixFilter, config.animationSpeed, {
                alpha: config.finalAlpha,
                ease: Linear.easeNone,
                onComplete: this.removeFilter.bind(this, component)
            });
            this._colorMatrixFilter = new PIXI.filters.ColorMatrixFilter();

            // this.removeFilter(component);
        }
    }

    public static removeFilter(component: DisplayObject): void {
        component.filters = [];
    }
}

export type GreyFilterConfig = {
    greyScale: number;
    animationSpeed: number;
    initialAlpha: number;
    finalAlpha: number;
    ease: Linear | Sine | Back;
};