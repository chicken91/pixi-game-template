declare module PIXI {
    class TextInput extends PIXI.Container{
        htmlInput: HTMLInputElement;
        text: string;

        constructor(anchor: TextInputStyle);
    }

    interface TextInputStyle {
        input: InputProperties,
        box: BoxProperties
    }

    interface InputProperties {
        fontFamily: string,
        fontSize: string,
        padding: string,
        width: string,
        color: string
    }

    interface BoxProperties {
        default: BoxStateProperties,
        focused: BoxStateProperties,
        disabled: BoxStateProperties,
    }

    interface BoxStateProperties {
        fill: number,
        rounded: number,
        stroke: BoxStrokeProperties,
    }

    interface BoxStrokeProperties {
        color: number,
        width: number
    }
}