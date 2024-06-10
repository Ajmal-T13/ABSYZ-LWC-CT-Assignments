import { LightningElement, track, wire } from 'lwc';
import getAccountsToDisplay from '@salesforce/apex/AccountController.getAccountsToDisplay';
import getAccountDetails from '@salesforce/apex/AccountController.getAccountDetails';

export default class AccountDisplay extends LightningElement {
    @track accounts;
    @track selectedAccount;
    @track showModal = false;

    @wire(getAccountsToDisplay)
    wiredAccounts({ error, data }) {
        if (data) {
            this.accounts = data;
        } else if (error) {
            console.error('Error fetching accounts:', error);
        }
    }

    handleShowDetails(event) {
        const accountId = event.target.dataset.id;
        getAccountDetails({ accountId })
            .then(result => {
                this.selectedAccount = result;
                this.showModal = true;
            })
            .catch(error => {
                console.error('Error fetching account details:', error);
            });
    }

    handleCloseModal() {
        this.showModal = false;
    }
}
