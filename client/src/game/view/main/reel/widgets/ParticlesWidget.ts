import Emitter = PIXI.particles.Emitter;
import Container = PIXI.Container;
import {Particles} from "../../../../constants";

export class ParticlesWidget extends Container {
    private particlesEmitter: Emitter;
    private lastTime: number;
    private activeAnimation: boolean;

    public initWidget(): void {
        let texture = PIXI.utils.TextureCache[Particles.data.texture];
        this.particlesEmitter = new Emitter(this, [texture], Particles.data.script);
    }

    public onRender(): void {
        if (this.activeAnimation) {
            let currentTime = Date.now();
            let passedTime = (currentTime - this.lastTime) / 1000;
            this.particlesEmitter.update(passedTime);
            this.lastTime = currentTime;
        }
    }

    public startAnimation(): void {
        this.activeAnimation = true;
        this.particlesEmitter.emit = true;
        this.lastTime = Date.now();
    }

    public stopAnimation(): void {
        this.activeAnimation = false;
        this.particlesEmitter.emit = false;
        this.particlesEmitter.cleanup();
    }
}
