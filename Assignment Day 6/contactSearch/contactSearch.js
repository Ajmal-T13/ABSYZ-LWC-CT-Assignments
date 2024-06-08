import { LightningElement, wire } from 'lwc';
import searchContacts from '@salesforce/apex/ContactController.searchContacts';

export default class ContactSearch extends LightningElement {
    searchTerm = '';
    contacts;
    error;
    showContacts = false;

    @wire(searchContacts, { searchTerm: '$searchTerm' })
    wiredContacts({ error, data }) {
        if (data) {
            this.contacts = data;
            this.error = undefined; 
            this.showContacts = true; 
        } else if (error) {
            this.contacts = undefined;
            this.error = error;
            this.showContacts = false; 
            console.error('Error fetching Contact data:', error);
        }
    }

    get contactName() {
        return this.contacts && this.contacts.length ? this.contacts[0].Name : '';
    }
    get contactPhone() {
        return this.contacts && this.contacts.length ? this.contacts[0].Phone : '';
    }
    get contactEmail() {
        return this.contacts && this.contacts.length ? this.contacts[0].Email : '';
    }

    handleSearchTermChange(event) {
        this.searchTerm = event.target.value;
        this.showContacts = false;
    }
}
