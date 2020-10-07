import { ShowGameSceneAction } from "../../game/actions/ShowGameSceneAction";
import { HideLoadSceneAction } from "../../game/actions/HideLoadSceneAction";
import { LazyAssetsAction } from "../../game/actions/LazyAssetsAction";
import { IAction } from "../../../../components/actions/IAction";
import { InitialAssetsAction } from "../../game/actions/InitialAssetsAction";
import { StateType } from "../types/StateType";
import { ShowLoadSceneAction } from "../../game/actions/ShowLoadSceneAction";
import { SequenceAction } from "../../../../components/actions/SequenceAction";
import { PreloadAssetsAction } from "../../game/actions/PreloadAssetsAction";
import { AbstractState } from "./AbstractState";

export class LoadState extends AbstractState {
    public name: string = StateType.LoadState;

    protected getInitialNextState(): string {
        return StateType.IdleState;
    }

    protected initAction(): IAction {
        return new SequenceAction([
            PreloadAssetsAction,
            ShowLoadSceneAction,
            InitialAssetsAction,
            HideLoadSceneAction,
            ShowGameSceneAction,
            LazyAssetsAction
        ]);
    }
}