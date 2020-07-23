import { SpineView } from "../../../../core/components/views/SpineView";
import { LayoutParser } from "../../../../core/engine/modules/layout/parsers/LayoutParser";
import { inject } from "../../../../core/injects/inject";
import { GraphicsView } from "../../../../core/components/views/GraphicsView";
import { Linear, TimelineMax, TweenMax } from 'gsap';
import { TemplateConstants } from "../../../TemplateConstants";
import { MathUtils } from "../../../../core/utils/MathUtils";
import { CollisionUtils } from "../../../../core/utils/CollisionUtils";
import { TemplateEvents } from "../../TemplateEvents";
import { ContainerView } from "../../../../core/components/views/ContainerView";


export class BoyView extends ContainerView {
    protected layoutParser: LayoutParser = inject(LayoutParser);
    protected boySpine!: SpineView;

    protected boxGraphicList: Array<GraphicsView> = new Array<GraphicsView>();
    protected animatedBox!: GraphicsView;
    protected boxAnimation!: TimelineMax;

    protected autoPlayBehaviorActivated: boolean = false;

    public onAdded(): void {
        super.onAdded();
        this.boySpine.startAnimation("idle", true);
    }

    public onTouchAnyWhere(): void {
        if (!this.boySpine.isAnimationActive("jump")) {
            this.boySpine.stopAnimation();
            this.boySpine.startAnimation("jump", false).then(() => {
                this.boySpine.startAnimation("idle", true);
            });
        }
    }

    public changeAutoPlayBehavior(autoPlayActivated: boolean): void {
        this.autoPlayBehaviorActivated = autoPlayActivated;
    }

    public startBoxFlyingAnimation(): void {
        this.createBoxWidget();
        const directionMultiplier: number = this.animatedBox.position.x > 0 ? 1 : -1;
        const animationTime = 2.5;
        this.boxAnimation = new TimelineMax();
        this.boxAnimation
            .to(this.animatedBox, animationTime * 0.4, {alpha: 1}, 0)
            .to(this.animatedBox, animationTime * 0.8, {
                x: this.boySpine.x + 170 * directionMultiplier,
                ease: Linear.easeNone,
                onUpdate: this.checkCollision.bind(this)
            }, 0)
            .call(this.autoPlayJump.bind(this), [], {}, animationTime * 0.4)
            .call(this.updateBoyPosition.bind(this), [], {}, animationTime * 0.8)
            .to(this.animatedBox, animationTime * 0.2, {x: this.boySpine.x, ease: Linear.easeNone}, animationTime * 0.8)
            .call(this.onFinishBoxFlyingAnimation.bind(this), [], {}, animationTime);
    }

    public startZoomAnimation(): void {
        const zoomMultiplier: number = 1920 / (this.height + this.y);
        if (zoomMultiplier < 1) {
            TweenMax.to(this.position, 0.5, {y: -this.boySpine.y});
            for (const child of this.children) {
                TweenMax.to(child.scale, 0.5, {x: zoomMultiplier, y: zoomMultiplier});
                TweenMax.to(child.position, 0.5, {y: child.position.y * zoomMultiplier});
            }
        }
    }

    public stopAnimations(): void {
        if (this.boxAnimation) {
            this.boxAnimation.kill();
            this.boxAnimation = null;
        }
        this.boySpine.stopAnimation();
        TweenMax.killTweensOf(this.animatedBox);
    }

    protected checkCollision(): void {
        const currentAnimation = this.boySpine.widget.state.getCurrent(0);
        if (currentAnimation && CollisionUtils.isSpineCollideContainer(this.boySpine, this.animatedBox)) {
            this.stopAnimations();
            this.onCollideBox();
            this.startZoomAnimation();
        }
    }

    protected onFinishBoxFlyingAnimation(): void {
        this.emit(TemplateEvents.FINISH_BOX_FLYING);
    }

    protected onCollideBox(): void {
        this.emit(TemplateEvents.COLLIDE_BOX);
    }

    protected autoPlayJump(): void {
        if (this.autoPlayBehaviorActivated) {
            this.onTouchAnyWhere();
        }
    }

    protected updateBoyPosition(): void {
        this.boySpine.stopAnimation();
        this.boySpine.y -= this.animatedBox.height;
        if ((this.boySpine.y + this.y) < 960) {
            TweenMax.to(this.position, 0.35, {y: 960 - this.boySpine.y})
        }
        this.boySpine.startAnimation("idle", true);
    }

    protected createBoxWidget(): void {
        this.animatedBox = <GraphicsView>this.layoutParser.createFromLibrary("boxView");
        this.animatedBox.widget.tint = MathUtils.getRandomInArray(TemplateConstants.boxColors);
        this.animatedBox.alpha = 0;
        this.addChildAt(this.animatedBox, this.getChildIndex(this.boySpine));
        this.animatedBox.onResize();
        this.animatedBox.position.set(MathUtils.getRandomInArray([-200, 1640]), this.boySpine.y);
        this.boxGraphicList.push(this.animatedBox);
    }
}