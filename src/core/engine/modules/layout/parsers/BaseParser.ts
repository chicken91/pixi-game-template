import { BaseBuilder } from '../builders/BaseBuilder';
import { getViewClass, inject } from "../../../../injects/inject";
import { IView } from "../../../../components/views/IView";
import { LayoutModel } from "../models/LayoutModel";

export abstract class BaseParser {
    private _builders: { [constructorName: string]: BaseBuilder } = {};
    private _layoutModel: LayoutModel = inject(LayoutModel);

    constructor() {
        this.addBuilders();
    }

    /**
     * Add builders for each resource type in the layout
     * use addBuilder() method
     */
    protected abstract addBuilders(): void;

    /**
     * Creates an element by id from layout we loaded for the game
     * @param id of element from layout
     */
    public createFromLibrary(id: string): IView {
        const layout: any = this._layoutModel.getLibraryComponent(id);
        return this.createFromLayout(layout);
    }

    /**
     * Creates an element part of layout
     * @param layout part of layout for specific component
     */
    public createFromLayout(layout: any): IView {
        const builder = this.getBuilder(layout.type);
        const bindedClass = getViewClass(layout.bindId);

        let component: IView = builder.create(layout, this, bindedClass);
        return component;
    }

    /**
     * Adding builder to map for each type
     * @param type type of layout element
     * @param builder builder class which assigned to specific type
     */
    protected addBuilder(type: string, builder: BaseBuilder): void {
        this._builders[type] = builder;
    }

    /**
     * return  builder for specific layout type
     * @param type type of layout element
     */
    protected getBuilder(type: string): BaseBuilder {
        const builder = this._builders[type];
        if (!builder) {
            console.error('NO builder for resource with type: ' + type);
        }

        return builder;
    }
}