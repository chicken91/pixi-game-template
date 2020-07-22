import { GroupContainerView } from "../../../core/components/views/GroupContainerView";
import { SpineView } from "../../../core/components/views/SpineView";
import { LayoutParser } from "../../../core/engine/modules/layout/parsers/LayoutParser";
import { inject } from "../../../core/injects/inject";
import { GraphicsView } from "../../../core/components/views/GraphicsView";
import { Linear, TimelineMax, TweenMax } from 'gsap';
import { TemplateConstants } from "../../TemplateConstants";
import { MathUtils } from "../../../core/utils/MathUtils";
import { CollisionUtils } from "../../../core/utils/CollisionUtils";
import { TemplateEvents } from "../../TemplateEvents";


export class MainView extends GroupContainerView {
    protected layoutParser: LayoutParser = inject(LayoutParser);
    protected boySpine!: SpineView;

    protected boxGraphicList: Array<GraphicsView> = new Array<GraphicsView>();
    protected animatedBox!: GraphicsView;
    protected boxAnimation!: TimelineMax;

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

    public startBoxFlyingAnimation(): void {
        this.createBoxWidget();
        const directionMultiplier: number = this.animatedBox.position.x > 0 ? 1 : -1;
        this.boxAnimation = new TimelineMax();
        this.boxAnimation
            .to(this.animatedBox, 0.35, {alpha: 1}, 0)
            .to(this.animatedBox, 2, {
                x: this.boySpine.x + 170 * directionMultiplier,
                ease: Linear.easeNone,
                onUpdate: this.checkCollision.bind(this)
            }, 0)
            .call(this.updateBoyPosition.bind(this), [], {}, 2)
            .to(this.animatedBox, 0.35, {x: this.boySpine.x, ease: Linear.easeNone}, 2)
            .call(this.onFinishBoxFlyingAnimation.bind(this), [], {}, 2.35);
    }

    protected checkCollision(): void {
        const currentAnimation = this.boySpine.widget.state.getCurrent(0);
        if (currentAnimation && CollisionUtils.isSpineCollideContainer(this.boySpine, this.animatedBox)) {
            this.boySpine.stopAnimation();
            TweenMax.killTweensOf(this.animatedBox);
            if (this.boxAnimation) {
                this.boxAnimation.kill();
                this.boxAnimation = null;
            }
            this.onCollideBox();
        }
    }

    protected onFinishBoxFlyingAnimation(): void {
        this.emit(TemplateEvents.FINISH_BOX_FLYING);
    }

    protected onCollideBox(): void {
        this.emit(TemplateEvents.COLLIDE_BOX);
    }

    protected updateBoyPosition(): void {
        this.boySpine.stopAnimation();
        this.boySpine.y -= this.animatedBox.height;
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