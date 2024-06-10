public with sharing class AccountController {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts() {
        return [SELECT Id, Name FROM Account];
    }

    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountsToDisplay() {
        return [SELECT Id, Name, Phone, Industry, Type, Rating FROM Account LIMIT 10];
    }

    @AuraEnabled(cacheable=true)
    public static Account getAccountDetails(Id accountId) {
        return [SELECT Id, Name, Phone, Industry, Type, Rating FROM Account WHERE Id = :accountId LIMIT 1];
    }
}
