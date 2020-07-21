import { Linear, TimelineMax } from 'gsap';
import { ContainerView } from "../../../../../components/views/ContainerView";

export class LoadView extends ContainerView {
    public hide(): Promise<void> {
        return new Promise<void>(resolve => {
            new TimelineMax()
                .to(this, 1, {}, 0)
                .to(this, 0.35, {alpha: 0, ease: Linear.easeIn}, 1)
                .call(resolve, [], {}, 1.35);
        });
    }
}