import { LightningElement, track } from 'lwc';

export default class ParentComponent extends LightningElement {
    @track childInputValue = '';

    handleChildInputChange(event) {
        this.childInputValue = event.detail;
    }
}
