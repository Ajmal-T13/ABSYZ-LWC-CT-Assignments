public with sharing class ContactController {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactsByAccountId(Id accountId) {
        return [
            SELECT Id, Name, Title, Phone, Email, Owner.Name 
            FROM Contact 
            WHERE AccountId = :accountId
        ];
    }
    @AuraEnabled(cacheable=true)
    public static List<Contact> getAllContacts() {
        return [SELECT Id, Name FROM Contact];
    }
    @AuraEnabled(cacheable=true)
    public static List<Contact> searchContacts(String searchTerm) {
        String searchKey = '%' + searchTerm + '%';
        return [SELECT Id, Name, Phone, Email FROM Contact WHERE Name LIKE :searchKey];
    }
        @AuraEnabled
        public static void createContact(Contact contact) {
            try {
                insert contact;
            } catch (Exception e) {
                throw new AuraHandledException(e.getMessage());
            }
        }
}
