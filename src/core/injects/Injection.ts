/**
 * @class Injection
 * Contains all injection data and functionality for one object. *
 */
export class Injection {
    // Link on object if it singleton
    private _instance: any;
    // Flag for singleton object creating
    private _isSingleton: boolean = false;
    // Constructor for instance creation
    private _instanceConstructor!: Function;
    // Flag for a force creating object after initialized all binding class
    private _isForceCreation: boolean = false;
    private _isServerModel: boolean = false;

    constructor(instanceBindedConstructor: any) {
        this._instanceConstructor = instanceBindedConstructor;
    }

    public getInstance(): any {
        if (this._isSingleton) {
            if (!this._instance) {
                this._instance = this.createInstance();
            }
            return this._instance;
        }
        return this.createInstance();
    }

    public createInstance(): any {
        const constructor = this.getConstructor();
        return new constructor();
    }

    public getConstructor(): any {
        return this._instanceConstructor;
    }

    public asSingleton(): Injection {
        this._isSingleton = true;
        return this;
    }

    public to(instanceConstructor: Function): Injection {
        if (!instanceConstructor) {
            throw new Error("There is an undefined constructor you are trying bind to.");
        }

        this._instanceConstructor = instanceConstructor;
        this._instance = null;
        return this;
    }

    public isForceCreation(): boolean {
        return this._isForceCreation;
    }

    public forceCreation(): Injection {
        this._isForceCreation = true;
        return this;
    }

    public isServerModel(): boolean {
        return this._isServerModel;
    }

    public asServerModel(): Injection {
        this._isSingleton = true;
        this._isServerModel = true;
        return this;
    }
}