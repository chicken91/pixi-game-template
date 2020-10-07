import { EventDispatcher } from "../../../../components/events/EventDispatcher";
import { getServerModels, inject } from "../../../../injects/inject";
import { ServerRequestFactory } from "../factory/ServerRequestFactory";
import { IServerModel } from "../../../../components/models/IServerModel";
import { CoreEvents } from "../../CoreEvents";
import { AbstractRequest } from "../request/AbstractRequest";
import { ServerRequestData } from "../data/ServerRequestData";
import { isNullOrUndefined } from 'util';
import { ExtendedResponse, IResponse } from '../../CoreTypes';

export class ServerManager {
    protected dispatcher: EventDispatcher = inject(EventDispatcher);
    protected serverRequestFactory: ServerRequestFactory = inject(ServerRequestFactory);
    protected serverModels: Array<IServerModel>;
    protected requestMap: { [requestId: number]: ServerRequestData } = {};
    protected currentRequest: AbstractRequest | undefined;
    protected requestQueue: Array<AbstractRequest> = [];

    constructor() {
        this.serverModels = getServerModels();
        this.addListeners();
    }

    protected addListeners(): void {
        this.dispatcher.addListener(CoreEvents.SERVER_REQUEST, this.onServerRequest.bind(this));
        // this.serverApi.observeEvent("ServerResponseEventName", this.onServerResponse.bind(this));
    }

    protected onServerResponse(data: IResponse): void {
        console.log(`%c` + `[ServerManager] get with data bellow:`, `color:#008ae6;font-weight:bold`);
        console.log(data);

        this.updateServerModels(this.updateResponse(data));
        this.invokeRequestCallback(data);

        if (data.status === "ERROR") {
            this.onServerError(data)
        }
        this.currentRequest = undefined;
        this.sendRequestFromQueue();
    }

    protected onServerRequest(serverRequestData: ServerRequestData): void {
        let request: AbstractRequest = this.getRequestData(serverRequestData);
        this.addRequestCallback(request.id, serverRequestData);
        this.requestQueue.push(request);
        this.sendRequestFromQueue();
    }

    protected sendRequestFromQueue(): void {
        if (isNullOrUndefined(this.currentRequest)) {
            this.currentRequest = this.requestQueue.shift();
            if (this.currentRequest) {
                // this.serverApi.sendEvent("TempRequestEventName", this.currentRequest);
            }
        }
    }

    protected onConnectionLost(data: IResponse): void {
        this.onServerError(data);
        this.dispatcher.dispatch(CoreEvents.LOST_CONNECTION);
    }

    protected onServerError(response: IResponse): void {
        console.log(`%c` + ` ERROR COMING FROM THE SERVER `, `color:#ff4000;font-weight:bold`);
        this.dispatcher.dispatch(CoreEvents.SERVER_ERROR, response)
    }

    protected updateResponse(data: IResponse): ExtendedResponse {
        const updatedResponse = data as ExtendedResponse;
        updatedResponse.request = this.requestMap[data.id];
        return updatedResponse;
    }

    protected updateServerModels(data: ExtendedResponse): void {
        for (let serverModel of this.serverModels) {
            serverModel.fetchResponseData(data);
        }
    }

    protected getRequestData(serverRequest: ServerRequestData): AbstractRequest {
        const data = this.serverRequestFactory.getServerRequestData(serverRequest);
        return data;
    }

    protected invokeRequestCallback(response: IResponse): void {
        const request = this.requestMap[response.id];
        if (request) {
            delete this.requestMap[response.id];
            if (request.callBack) {
                request.callBack();
            }
        }
    }

    protected addRequestCallback(requestId: number, serverRequestData: ServerRequestData): void {
        if (serverRequestData) {
            this.requestMap[requestId] = serverRequestData;
        }
    }
}