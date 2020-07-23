import { StateType } from "../../../../core/engine/modules/stateMachine/types/StateType";
import { IAction } from "../../../../core/components/actions/IAction";
import { SequenceAction } from "../../../../core/components/actions/SequenceAction";
import { PreloadAssetsAction } from "../../../../core/engine/modules/game/actions/PreloadAssetsAction";
import { ShowLoadSceneAction } from "../../../../core/engine/modules/game/actions/ShowLoadSceneAction";
import { InitialAssetsAction } from "../../../../core/engine/modules/game/actions/InitialAssetsAction";
import { HideLoadSceneAction } from "../../../../core/engine/modules/game/actions/HideLoadSceneAction";
import { ShowGameSceneAction } from "../../../../core/engine/modules/game/actions/ShowGameSceneAction";
import { LazyAssetsAction } from "../../../../core/engine/modules/game/actions/LazyAssetsAction";
import { TapToStartAction } from "../../main/actions/TapToStartAction";
import { TemplateStateType } from "../types/TemplateStateType";
import { LoadState } from "../../../../core/engine/modules/stateMachine/states/LoadState";

export class TemplateLoadState extends LoadState {
    public name: string = StateType.LoadState;

    protected getInitialNextState(): string {
        return TemplateStateType.ManualState;
    }

    protected initAction(): IAction {
        return new SequenceAction([
            PreloadAssetsAction,
            ShowLoadSceneAction,
            InitialAssetsAction,
            HideLoadSceneAction,
            ShowGameSceneAction,
            LazyAssetsAction,
            TapToStartAction
        ]);
    }
}