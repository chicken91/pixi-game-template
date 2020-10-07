import { ButtonPolicy } from '../policy/ButtonPolicy';
import { ButtonEventType } from '../types/ButtonEventType';
import { Container, Point, Texture } from 'pixi.js';

import { ContainerView } from './ContainerView';
import { IView } from './IView';
import { ButtonViewType } from "../types/ButtonViewType";
import { WidgetView } from "./WidgetView";
import { ImageView } from "./ImageView";
import Sprite = PIXI.Sprite;

export class ButtonView extends ContainerView {
    protected states: { [stateName: string]: Texture } = {};
    protected stateComponents: { [stateName: string]: IView[] } = {};
    protected mainImage!: WidgetView<Sprite>;
    protected componentContainer!: Container;
    protected _currentState!: string;
    protected _movable = false;

    protected _policy!: ButtonPolicy;

    constructor() {
        super();

        this.initialize();
    }

    protected initialize(): void {
        this.mainImage = new ImageView();
        this.mainImage.widget.anchor.set(0.5, 0.5);
        this.addChild(this.mainImage);

        this.componentContainer = new Container();
        this.addChild(this.componentContainer);

        this.buttonMode = true;
        this.interactive = true;

        this.setListeners();
    }

    public setMainImageAnchor(anchor: Point): void {
        this.mainImage.widget.anchor.set(anchor.x, anchor.y);
    }

    public onResize(width?: number, height?: number): void {
        super.onResize();
    }

    protected setListeners(): void {
        this.on(ButtonEventType.CHANGE_STATE, this.onChangeState.bind(this));
    }

    public onChangeState(state: string, force: boolean = false): void {
        if ((this._currentState === state || this._currentState === this.getDisableState())
            && !force) {
            return;
        }
        this.interactive = state !== this.getDisableState();
        this._currentState = state;
        this.updateStateTexture(state);
    }

    public setHitArea(hitArea: PIXI.Rectangle) {
        this.hitArea = hitArea;
    }

    protected updateStateTexture(state: string): void {
        const texture: Texture = this.states[state];
        if (texture) {
            this.mainImage.widget.texture = texture;
        }

        const components = this.stateComponents[state];
        if (components) {
            this.componentContainer.removeChildren();
            components.forEach(component => {
                this.componentContainer.addChild(component);
                component.onResize();
            });
        }
    }

    public setStateTexture(stateName: string, stateTexture: Texture): void {
        this.states[stateName] = stateTexture;
        if (stateName === this._currentState) {
            this.updateStateTexture(stateName);
        }
    }

    public setStateComponent(stateName: string, component: IView): void {
        if (!this.stateComponents[stateName]) {
            this.stateComponents[stateName] = [];
        }
        this.stateComponents[stateName].push(component);
    }

    protected getDisableState(): string {
        return ButtonViewType.DISABLE;
    }

    public destroy() {
        super.destroy();
        this.off(ButtonEventType.CHANGE_STATE, this.onChangeState.bind(this));
        this._policy.destroy();
    }

    public setPolicy(policy: ButtonPolicy): void {
        if (this._policy) {
            this._policy.destroy();
        }
        this._policy = policy;
    }

    public get currentState(): string {
        return this._currentState;
    }

    public get movable(): boolean {
        return this._movable;
    }

    public set movable(value: boolean) {
        this._movable = value;
    }
}

