import { LightningElement, api, wire } from 'lwc';
import getContactsByAccountId from '@salesforce/apex/ContactController.getContactsByAccountId';

const COLUMNS = [
    { label: 'Contact Name', fieldName: 'Name' },
    { label: 'Title', fieldName: 'Title' },
    { label: 'Phone', fieldName: 'Phone' },
    { label: 'Email', fieldName: 'Email' },
    { label: 'Contact Owner', fieldName: 'OwnerName' }
];

export default class ContactList extends LightningElement {
    @api recordId;
    columns = COLUMNS;
    contacts;

    @wire(getContactsByAccountId, { accountId: '$recordId' })
    wiredContacts({ error, data }) {
        if (data) {
            this.contacts = data.map(contact => {
                return {
                    ...contact,
                    OwnerName: contact.Owner.Name
                };
            });
        } else if (error) {
            this.contacts = undefined;
            console.error(error);
        }
    }
}
