import { LightningElement, api, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';
import RATING_FIELD from '@salesforce/schema/Account.Rating';

export default class AccountDetails extends LightningElement {
    @api recordId;
    account;
    error;
    isLoading = true;

    @wire(getRecord, { recordId: '$recordId', fields: [NAME_FIELD, INDUSTRY_FIELD, RATING_FIELD] })
    wiredAccount({ error, data }) {
        this.isLoading = false;
        if (data) {
            this.account = data;
            this.error = undefined;
        } else if (error) {
            this.error = error.body.message;
            this.account = undefined;
        }
    }
}
