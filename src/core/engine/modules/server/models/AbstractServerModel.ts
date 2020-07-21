import { IServerModel } from "../../../../components/models/IServerModel";
import { AbstractModel } from "../../../../components/models/AbstractModel";
import { ExtendedResponse } from '../../CoreTypes';

/**
 * @class AbstractServerModel
 *
 * Base server model class
 */
export abstract class AbstractServerModel extends AbstractModel implements IServerModel {
    public abstract fetchResponseData(response: ExtendedResponse): void;
}