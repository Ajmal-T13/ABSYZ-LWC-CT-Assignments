import { LightningElement, api, track } from 'lwc';
import { FlowNavigationNextEvent } from 'lightning/flowSupport';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class Flowlwccomp extends LightningElement {
@api availableActions = [];
@api recordId;
@api accountRecordId;
@api objectApiName = 'Account';
fields = ['Name', 'Type', 'Industry'];

handleSuccess(event) {
    const evt = new ShowToastEvent({
    title: "Record Update",
    message: "Account record is updated Successfully",
    variant: "success"
    });
    this.dispatchEvent(evt);
    this.handleGoNext();
    }

    handleGoNext() {
    if (this.availableActions.find(action => action==='NEXT')){
    const navigateNextEvent = new FlowNavigationNextEvent();
    this.dispatchEvent(navigateNextEvent);
    }   
    }
}