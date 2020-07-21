import { TemplateActivator } from "./template/TemplateActivator";

export function activation(): void {
    let activator = new TemplateActivator();
    activator.activate();
}

activation();