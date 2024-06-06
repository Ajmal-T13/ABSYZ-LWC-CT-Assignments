import { LightningElement, track } from 'lwc';

export default class ParentComponent extends LightningElement {
    @track inputValue = '';

    handleInputChange(event) {
        this.inputValue = event.target.value;
    }
}