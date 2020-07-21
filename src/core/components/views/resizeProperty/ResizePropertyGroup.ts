import { IResizeProperty } from "./IResizeProperty";
import { ScreenModel } from "../../../engine/modules/screen/model/ScreenModel";
import { inject } from "../../../injects/inject";
import { CoreConstants } from "../../../engine/modules/CoreConstants";
import { ResizePropertyType } from "../../types/ResizePropertyType";
import { isNullOrUndefined } from "util";

export class ResizePropertyGroup {
    protected _screenModel: ScreenModel = inject(ScreenModel);
    protected _resizePropertyMap: { [resizePropertyKey: string]: IResizeProperty } = {};
    protected _activePropertyKey!: string;

    public addResizeProperty(type: string, resizeProperty: IResizeProperty): void {
        this.mergeDefaultProperty(resizeProperty);
        this._resizePropertyMap[type] = resizeProperty;
    }

    public getResizePropertyByType(type: string): IResizeProperty {
        return this._resizePropertyMap[type];
    }

    public getActiveResizeProperty(): IResizeProperty {
        return this._resizePropertyMap[this._activePropertyKey];
    }

    public hasResizeProperty(type: string): boolean {
        return !isNullOrUndefined(this._resizePropertyMap[type]);
    }

    public getResizePropertyKeys(): Array<string> {
        return Object.keys(this._resizePropertyMap);
    }

    public onResize(width?: number, height?: number): void {
        let propertyKey = this.getPropertyKey();
        this.updatePropertiesByKey(propertyKey, width, height);
    }

    public onActivate(): void {
        let activePropertyKey = this._activePropertyKey ? this._activePropertyKey : ResizePropertyType.DEFAULT;
        let resizeProperty: IResizeProperty = this._resizePropertyMap[activePropertyKey];
        if (resizeProperty) {
            resizeProperty.onActivate();
        }
    }

    protected getPropertyKey(): string {
        if (CoreConstants.deviceType.MOBILE) {
            let key = this.updateRatioProperties();
            if (isNullOrUndefined(key)) {
                key = this.updateOrientationProperties();
                if (isNullOrUndefined(key)) {
                    return ResizePropertyType.DEFAULT;
                }
            }
            return key;
        } else {
            return ResizePropertyType.DEFAULT;
        }
    }

    protected updateOrientationProperties(): string | undefined {
        let ratioKeyList: Array<string> = Object.keys(this._resizePropertyMap);
        let index: number = ratioKeyList.indexOf(this._screenModel.orientation);
        if (index !== -1) {
            let ratioKey: string = ratioKeyList[index];
            return ratioKey;
        }
        return undefined;
    }

    protected updateRatioProperties(): string | undefined {
        let ratioKeyList: Array<string> = Object.keys(this._resizePropertyMap);
        for (let ratioKey of ratioKeyList) {
            if (ratioKey.includes("/")) {
                let splashIndex: number = ratioKey.indexOf("/");
                let ratioWidth: number = parseInt(ratioKey.substring(0, splashIndex));
                let rationHeight: number = parseInt(ratioKey.substring(splashIndex + 1));
                let ratioValue: number = rationHeight / ratioWidth;

                if (this._screenModel.ratio === ratioValue) {
                    return ratioKey;
                }
            }
        }
        return undefined;
    }

    protected updatePropertiesByKey(key: string, width?: number, height?: number): void {
        let resizeProperty: IResizeProperty = this._resizePropertyMap[key];
        if (resizeProperty) {
            if (this._activePropertyKey !== key) {
                this._activePropertyKey = key;
                resizeProperty.onActivate(width, height);
            }
            resizeProperty.onResize(width, height);
        }
    }

    protected mergeDefaultProperty(resizeProperty: IResizeProperty): void {
        let defaultResizeProperty: IResizeProperty = this.getResizePropertyByType(ResizePropertyType.DEFAULT);
        if (defaultResizeProperty) {
            let properties = Object.getOwnPropertyNames(defaultResizeProperty);
            for (let property of properties) {
                if (!resizeProperty.hasOwnProperty(property)) {
                    resizeProperty[property] = defaultResizeProperty[property];
                }
            }
        }
    }

    public get activePropertyKey(): string {
        return this._activePropertyKey;
    }
}