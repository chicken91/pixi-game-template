import { ServerRequestData } from "./server/data/ServerRequestData";

export interface StringReplacement {
    pattern: RegExp,
    replacement: string
}

export interface IResponse {
    id: number;
    status: string;
}

export interface ExtendedResponse extends IResponse {
    id: number;
    request: ServerRequestData;
}

export interface IStateMachineOptions {
    initialState: Function;
    transitions: IStateMachineTransition[];
}

export interface IStateMachineTransition {
    from: Function[];
    to: Function;
}
