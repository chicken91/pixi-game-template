import { InitRequest } from "../request/InitRequest";
import { AbstractRequest } from "../request/AbstractRequest";
import { ServerRequestType } from '../types/ServerRequestType';
import { ServerRequestData } from "../data/ServerRequestData";

export class ServerRequestFactory {
    public getServerRequestData(request: ServerRequestData): AbstractRequest {
        switch (request.type) {
            case ServerRequestType.INIT:
                return this.createInitRequest();
            default:
                throw new Error("You are trying create request with missing type [" + request.type + "]");
        }
    }

    protected createInitRequest(): InitRequest {
        return new InitRequest();
    }
}