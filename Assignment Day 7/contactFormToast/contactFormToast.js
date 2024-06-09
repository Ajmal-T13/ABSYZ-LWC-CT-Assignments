import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import createContact from '@salesforce/apex/ContactController.createContact';

export default class ContactForm extends LightningElement {
    @track firstName = '';
    @track lastName = '';
    @track email = '';
    @track phone = '';

    handleInputChange(event) {
        const field = event.target.dataset.id;
        if (field === 'FirstName') {
            this.firstName = event.target.value;
        } else if (field === 'LastName') {
            this.lastName = event.target.value;
        } else if (field === 'Email') {
            this.email = event.target.value;
        } else if (field === 'Phone') {
            this.phone = event.target.value;
        }
    }

    handleCreateContact() {
        const contact = {
            FirstName: this.firstName,
            LastName: this.lastName,
            Email: this.email,
            Phone: this.phone
        };

        createContact({ contact })
            .then(() => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Contact created successfully',
                        variant: 'success'
                    })
                );
                this.clearForm();
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating contact',
                        message: error.body.message,
                        variant: 'error'
                    })
                );
            });
    }

    clearForm() {
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        this.phone = '';
    }
}
