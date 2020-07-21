import { Action } from "../../../../components/actions/Action";
import { ServerRequestType } from "../types/ServerRequestType";
import { CoreEvents } from "../../CoreEvents";
import { ServerRequestData } from "../data/ServerRequestData";

export class InitializeServerAction extends Action {

    protected onExecute(): void {
        this.dispatcher.dispatch(CoreEvents.SERVER_REQUEST, new ServerRequestData(ServerRequestType.INIT, this.onFinish.bind(this)));
    }
}