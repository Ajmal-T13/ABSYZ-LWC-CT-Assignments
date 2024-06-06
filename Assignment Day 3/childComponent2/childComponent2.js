import { LightningElement } from 'lwc';

export default class ChildComponent extends LightningElement {
    handleInputChange(event) {
        const inputValue = event.target.value;
        const inputEvent = new CustomEvent('inputchange', {
            detail: inputValue
        });
        this.dispatchEvent(inputEvent);
    }
}
