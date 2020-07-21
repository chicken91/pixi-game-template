import { inject } from "../../../../injects/inject";
import { LoadUtils } from "../../assetLoader/utils/LoadUtils";
import { LoadModel } from "../../assetLoader/models/LoadModel";
import { IResources } from "../../assetLoader/interfaces/IResources";
import { LocaleModel } from "../../locale/models/LocaleModel";
import { Action } from "../../../../components/actions/Action";
import { LayoutModel } from "../../layout/models/LayoutModel";
import { CoreConstants } from "../../CoreConstants";
import { GameConfig } from "../config/GameConfig";
import { ScreenModel } from "../../screen/model/ScreenModel";
import { StringReplacement } from "../../CoreTypes";
import { StringUtils } from '../../../../utils/StringUtils';
import { GameModel } from "../model/GameModel";

export class LoadConfigAction extends Action {
    protected gameConfig: GameConfig = inject(GameConfig);
    protected gameModel: GameModel = inject(GameModel);
    protected localeModel: LocaleModel = inject(LocaleModel);
    protected loadModel: LoadModel = inject(LoadModel);
    protected layoutModel: LayoutModel = inject(LayoutModel);
    protected screenModel: ScreenModel = inject(ScreenModel);

    protected onExecute(): void {
        this.loadConfigsPromise()
            .then(this.onFinish.bind(this));
    }

    protected onFinish(): void {
        this.gameModel.initialize(this.gameConfig);
        super.onFinish();
    }

    protected loadConfigsPromise(): Promise<any> {
        const patterns = this.getReplaceUrlPatterns();
        const layout_config_url = StringUtils.replacePatternInText(CoreConstants.layout_config_url, patterns);

        return LoadUtils.loadFile(CoreConstants.size_report_url)
            .then(this.setupSizeReportData.bind(this))

            // Load General Config File
            .then(() => LoadUtils.loadFile(CoreConstants.general_config_url))
            .then(this.setupGeneralConfigData.bind(this))

            // Load resources
            .then(() => LoadUtils.loadFile(CoreConstants.resources_config_url, true))
            .then(this.setupResourcesData.bind(this, patterns))

            // Load layout
            .then(() => LoadUtils.loadFile(layout_config_url))
            .then(this.setupLayoutConfigData.bind(this));
    }

    protected setupSizeReportData(data: any): Promise<any> {
        this.loadModel.sizeReportData = data;
        return Promise.resolve();
    }

    protected setupResourcesData(patterns: Array<StringReplacement>, data: string): Promise<any> {
        const replacePatternData = StringUtils.replacePatternInText(data, patterns);
        const resourceObject: IResources = JSON.parse(replacePatternData);
        this.loadModel.resourceData = resourceObject;
        return Promise.resolve();
    }

    protected setupLayoutConfigData(data: any): Promise<any> {
        this.layoutModel.layoutConfig = data;
        return Promise.resolve();
    }

    protected setupGeneralConfigData(data: any): Promise<any> {
        this.gameConfig.initialConfig = data;
        return Promise.resolve();
    }

    protected getReplaceUrlPatterns(): Array<StringReplacement> {
        return [
            {pattern: new RegExp("{dpi}", "g"), replacement: this.screenModel.dpi},
            {pattern: new RegExp("{multiply}", "g"), replacement: this.screenModel.multiply.toString()},
            {
                pattern: new RegExp("{platform}", "g"),
                replacement: CoreConstants.deviceType.MOBILE ? 'mobile' : 'desktop'
            },
        ];
    }
}