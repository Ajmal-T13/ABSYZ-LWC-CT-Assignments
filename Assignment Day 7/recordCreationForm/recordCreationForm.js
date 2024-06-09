import { LightningElement,api } from 'lwc';
import { FlowAttributeChangeEvent, FlowNavigationNextEvent, FlowNavigationFinishEvent} from 'lightning/flowSupport';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class RecordCreationComp extends LightningElement {
@api
availableActions = [];
@api objectApiName;
@api title;
@api parentRecordId;
@api recordIdAfterSave;
@api message;
@api fields;
@api parentFieldAPIName;
fieldsList;
connectedCallback(){
if(this.fields){
console.log('constructor entered');
this.fieldsList = this.fields.split(",");
}
}
handleSuccess(event) {
const evt = new ShowToastEvent({
title: "Record created",
message: this.message +'with record id:'+ event.detail.id,
variant: "success"
});


this.dispatchEvent(evt);
this.recordIdAfterSave = event.detail.id;
// const attributeChangeEvent = new FlowAttributeChangeEvent('recordIdAfterSave', this.recordIdAfterSave);
// this.dispatchEvent(attributeChangeEvent);
this.handleGoNext();
}

handleGoNext() {
if(this.recordIdAfterSave && this.recordIdAfterSave.startsWith('006')){
const finishEvent = new FlowNavigationFinishEvent();
this.dispatchEvent(finishEvent);
}
    if (this.availableActions.find(action => action === 'NEXT')) {
    const navigateNextEvent = new FlowNavigationNextEvent();
    this.dispatchEvent(navigateNextEvent);
    
    }
}
    
handleSubmit(event){
    event.preventDefault();
    const fields = event.detail.fields;
    console.log(this.parentFieldAPIName);
    console.log(fields[this.parentFieldAPIName]);
    fields[this.parentFieldAPIName] = this.parentRecordId;
    this. template.querySelector('lightning-record-form').submit(fields);

}
}