import { ExtendedResponse } from '../../engine/modules/CoreTypes';

/**
 * @interface IServerModel
 *
 * Base server model interface
 */
export interface IServerModel {
    /**
     * Method for getting necessary response data to model
     * Invoked on each server response for model which binded asServerModel()
     */
    fetchResponseData(response: ExtendedResponse): void
}