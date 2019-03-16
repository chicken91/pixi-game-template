import InteractionEvent = PIXI.interaction.InteractionEvent;
import Point = PIXI.Point;
import Sprite = PIXI.Sprite;
import {BaseView} from "../../../../common/components/BaseView";
import {SizeData} from "../../../data/size/SizeData";

export class InteractionView extends BaseView {
    private _interactionPanel: Sprite;

    protected setupChildren(parent: PIXI.Container) {
        super.setupChildren(parent);
        this._interactionPanel = new Sprite();
        this._interactionPanel.on("pointerdown", this.onClickStart.bind(this), this);
        this._interactionPanel.on("pointerup", this.onClickCancel.bind(this), this);
        this._interactionPanel.interactive = true;
        this._interactionPanel.width = SizeData.GAME_WIDTH;
        this._interactionPanel.height = SizeData.GAME_HEIGHT;
        this.view().addChild(this._interactionPanel);
    }

    protected addListeners(): void {
        super.addListeners();
        this._interactionPanel.on("pointerdown", this.onClickStart.bind(this), this);
        this._interactionPanel.interactive = true;
    }

    private onClickStart(event: InteractionEvent) {
        let local: Point = event.data.getLocalPosition(this._interactionPanel);


        this.data.reel.touchDelta.set(0, 0)
    }

    private onClickCancel(event: InteractionEvent) {
        //let local: Point = event.data.getLocalPosition(this._interactionPanel);

        this.data.reel.touchDelta.set(0, 0)
    }
}