import { LightningElement, track, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { createRecord } from 'lightning/uiRecordApi';
import { getPicklistValues, getObjectInfo } from 'lightning/uiObjectInfoApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import RATING_FIELD from '@salesforce/schema/Account.Rating';

export default class AccountCreator extends LightningElement {
    @track accountName = '';
    @track rating = '';
    @track ratingOptions = [];

    @wire(getObjectInfo, { objectApiName: ACCOUNT_OBJECT })
    accountMetadata;


    @wire(getPicklistValues, { recordTypeId: '$accountMetadata.data.defaultRecordTypeId', fieldApiName: RATING_FIELD })
    ratingPicklistValues({ data, error }) {
        if (data) {
            this.ratingOptions = data.values;
        } else if (error) {
            this.showToast('Error loading Rating picklist values', error.body.message, 'error');
        }
    }

    handleInputChange(event) {
        const field = event.target.dataset.id;
        if (field === 'Name') {
            this.accountName = event.target.value;
        } 
        else if (field === 'Rating') {
            this.rating = event.target.value;
        }
    }

    handleCreateAccount() {
        const fields = {};
        fields[NAME_FIELD.fieldApiName] = this.accountName;
        fields[RATING_FIELD.fieldApiName] = this.rating;

        const recordInput = { apiName: ACCOUNT_OBJECT.objectApiName, fields };

        createRecord(recordInput)
            .then(account => {
                this.showToast('Success', 'Account created successfully', 'success');
                this.clearForm();
            })
            .catch(error => {
                this.showToast('Error creating account', error.body.message, 'error');
            });
    }

    showToast(title, message, variant) {
        this.dispatchEvent(
            new ShowToastEvent({
                title: title,
                message: message,
                variant: variant
            })
        );
    }

    clearForm() {
        this.accountName = '';
        this.rating = '';
    }
}
