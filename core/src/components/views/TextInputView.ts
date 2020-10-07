import { WidgetView } from "./WidgetView";
import TextInput = PIXI.TextInput;
import TextInputStyle = PIXI.TextInputStyle;

export class TextInputView extends WidgetView<TextInput> {

    constructor(style: TextInputStyle) {
        const textInput: TextInput = new TextInput(style);
        super(textInput);
        textInput.htmlInput.addEventListener("change", this.onInputChange.bind(this));
    }

    protected onInputChange(): void {
        this.widget.emit("change", this.widget.text);
    }
}