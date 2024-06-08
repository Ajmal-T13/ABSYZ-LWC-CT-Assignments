import { LightningElement } from 'lwc';

export default class ParentComponent extends LightningElement {
    callChildMethod() {
        const childComponent = this.template.querySelector('c-child-component3');
        if (childComponent) {
            childComponent.childMethod();
        } else {
            console.error('Child component not found!');
        }
    }
}
