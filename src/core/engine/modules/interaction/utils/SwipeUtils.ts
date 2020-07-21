import { Container } from "pixi.js";
import { isNullOrUndefined } from "util";
import InteractionEvent = PIXI.interaction.InteractionEvent;

export class SwipeUtils {

    public static setupSwipeEvents(component: Container,
                                   swipeLength: number,
                                   onSwipeUpCallback: Function,
                                   onSwipeDownCallback: Function): void {
        component.interactive = true;
        component.on("pointerdown", this.onPointerDown.bind(component));
        component.on("pointerup", this.onPointerUp.bind(component));
        component.on("pointerout", this.onPointerUp.bind(component));
        component.on("pointercancel", this.onPointerUp.bind(component));
        component.on("pointermove", this.onPointerMove.bind(component, swipeLength, onSwipeUpCallback, onSwipeDownCallback));
    }

    private static onPointerDown(event: InteractionEvent): void {
        this["swipeStartPoint"] = event.data.getLocalPosition(event.currentTarget).clone();
    }

    private static onPointerUp(): void {
        this["swipeStartPoint"] = undefined;
    }

    private static onPointerMove(swipeLength: number,
                                 onSwipeUpCallback: Function,
                                 onSwipeDownCallback: Function,
                                 event: InteractionEvent): void {
        let swipeStartPoint = this["swipeStartPoint"];
        if (!isNullOrUndefined(swipeStartPoint)) {
            let currentSwipePoint = event.data.getLocalPosition(event.currentTarget);
            if (swipeStartPoint.y - currentSwipePoint.y > swipeLength) {
                SwipeUtils.onPointerUp.call(this);
                onSwipeUpCallback();
                return;
            }
            if (currentSwipePoint.y - swipeStartPoint.y > swipeLength) {
                SwipeUtils.onPointerUp.call(this);
                onSwipeDownCallback();
                return;
            }
        }
    }
}