import {Unit} from "./Unit";

export abstract class BaseController extends Unit {

    public setup(): BaseController {
        this.addListeners();
        return this;
    }

    protected abstract addListeners(): void;
}