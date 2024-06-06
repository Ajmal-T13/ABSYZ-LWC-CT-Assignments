import { LightningElement, track, wire } from 'lwc';
import { getPicklistValues, getObjectInfo } from 'lightning/uiObjectInfoApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { createRecord } from 'lightning/uiRecordApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import CONTACT_OBJECT from '@salesforce/schema/Contact';
import LAST_NAME_FIELD from '@salesforce/schema/Contact.LastName';
import TITLE_FIELD from '@salesforce/schema/Contact.Title';
import EMAIL_FIELD from '@salesforce/schema/Contact.Email';
import PHONE_FIELD from '@salesforce/schema/Contact.Phone';
import getAccounts from '@salesforce/apex/AccountController.getAccounts';

export default class CreateContact extends LightningElement {
    @track accountOptions = [];
    @track selectedAccount;
    @track lastName;
    @track title;
    @track email;
    @track phone;

    connectedCallback() {
        this.fetchAccounts();
    }

    fetchAccounts() {
        getAccounts()
            .then(result => {
                this.accountOptions = result.map(account => {
                    return { label: account.Name, value: account.Id };
                });
            })
            .catch(error => {
                this.showToast('Error', 'Error fetching accounts', 'error');
                console.error(error);
            });
    }

    handleAccountChange(event) {
        this.selectedAccount = event.target.value;
    }

    handleInputChange(event) {
        const field = event.target.name;
        if (field === 'lastName') {
            this.lastName = event.target.value;
        } else if (field === 'title') {
            this.title = event.target.value;
        } else if (field === 'email') {
            this.email = event.target.value;
        } else if (field === 'phone') {
            this.phone = event.target.value;
        }
    }

    handleSave() {
        const fields = {};
        fields[LAST_NAME_FIELD.fieldApiName] = this.lastName;
        fields[TITLE_FIELD.fieldApiName] = this.title;
        fields[EMAIL_FIELD.fieldApiName] = this.email;
        fields[PHONE_FIELD.fieldApiName] = this.phone;
        fields['AccountId'] = this.selectedAccount;

        const recordInput = { apiName: CONTACT_OBJECT.objectApiName, fields };

        createRecord(recordInput)
            .then(contact => {
                this.showToast('Success', 'Contact created successfully', 'success');
                this.clearFields();
            })
            .catch(error => {
                this.showToast('Error', 'Error creating contact', 'error');
                console.error(error);
            });
    }

    showToast(title, message, variant) {
        const event = new ShowToastEvent({
            title,
            message,
            variant,
        });
        this.dispatchEvent(event);
    }

    clearFields() {
        this.selectedAccount = '';
        this.lastName = '';
        this.title = '';
        this.email = '';
        this.phone = '';
    }
}
