
import { LightningElement } from 'lwc';

export default class ParentComponent4 extends LightningElement {
    childData;

    handleChildData(event) {
        this.childData = event.detail
    }
}
