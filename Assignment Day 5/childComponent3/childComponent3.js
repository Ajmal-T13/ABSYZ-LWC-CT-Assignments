import { LightningElement, api } from 'lwc';

export default class ChildComponent extends LightningElement {
    @api text;
    @api
    childMethod() {
        this.text = "Child Method called!";
        console.log('Child method called!');
    }
}
