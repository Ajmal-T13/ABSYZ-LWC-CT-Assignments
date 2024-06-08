import { LightningElement, wire } from 'lwc';
import getAllContacts from '@salesforce/apex/ContactController.getAllContacts';

export default class ContactDetails extends LightningElement {
    @wire(getAllContacts)
    contacts;
}
