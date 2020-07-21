import { Point } from "pixi.js";

export interface IResizeProperty {

    /**
     * position relative to parent or canvas, set as (v1, v2) where v1 and v1 have values {0, 1}
     */
    relativePosition: Point;

    /**
     * postion in pixels
     */
    position: Point;

    /**
     * anchor set as (v1, v2) where v1 and v1 have values {0, 1}
     */
    anchor: Point;

    /**
     * defines if the positioning accordingly to full width on window
     */
    globalPositioning: boolean;


    /**
     * updating the position of element py the properties set to it
     * @param elementToResize component that must be resized
     * @param width custom width by which element will be resized
     * @param height custom height by which element will be resized
     */
    onResize(width?: number, height?: number): void;

    onActivate(width?: number, height?: number): void;

    onApplyProperty(layout: any): void;
}