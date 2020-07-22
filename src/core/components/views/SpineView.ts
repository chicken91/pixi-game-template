import { Container, DisplayObject } from 'pixi.js';
import 'pixi-spine';
import { WidgetView } from "./WidgetView";
import { isNullOrUndefined } from "util";
import Spine = PIXI.spine.Spine;
import SkeletonData = PIXI.spine.core.SkeletonData;
import TrackEntry = PIXI.spine.core.TrackEntry;

export class SpineView extends WidgetView<Spine> {
    public defaultAnimation!: string;
    protected endAnimationPromiseResolve: Function | undefined;

    constructor(spineData: SkeletonData) {
        super(new Spine(spineData));
        this.widget.state.addListener({
            end: this.onAnimationEnd.bind(this),
            complete: this.onAnimationEnd.bind(this)
        });
    }

    public onAdded(): void {
        super.onAdded();
    }

    public insertComponentByIndex(component: DisplayObject, position: number): void {
        if (this.widget.children[position]) {
            (this.widget.children[position] as Container).addChild(component);
        }
    }

    public startAnimation(animationName: string, loop: boolean = false): Promise<any> {
        return new Promise<any>(resolve => {
            const spineName = this.getAnimationName(animationName);
            if (spineName) {
                this.stopAnimation();
                this.endAnimationPromiseResolve = resolve;
                this.widget.state.setAnimation(0, spineName, loop);
                this.onResize();
            } else {
                resolve();
            }
        });

    }

    public stopAnimation(): void {
        this.endAnimationPromiseResolve = undefined;
        this.widget['lastTime'] = 0;
        this.widget.update(0);
        this.widget.skeleton.setToSetupPose();
        this.widget.state.clearTracks();
    }

    public isAnimationActive(animationName: string): boolean {
        const currentTrackEntry: TrackEntry = this.widget.state.getCurrent(0);
        return currentTrackEntry && currentTrackEntry.animation.name === "jump" && !currentTrackEntry.isComplete();
    }

    public onRemoved(): void {
        super.onRemoved();
        this.stopAnimation();
    }

    protected getAnimationName(animationName: string): string {
        if (isNullOrUndefined(animationName) || animationName === "") {
            return this.defaultAnimation;
        } else {
            return animationName;
        }
    }

    protected onAnimationEnd(): void {
        if (this.endAnimationPromiseResolve) {
            this.endAnimationPromiseResolve();
            this.endAnimationPromiseResolve = undefined;
        }
    }
}