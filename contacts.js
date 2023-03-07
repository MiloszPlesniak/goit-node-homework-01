const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
  const contactsList = await fs.readFile(contactsPath);
  return JSON.parse(contactsList);
}

async function getContactById(contactId) {
  const contactsList = await listContacts();
  const foundContact = contactsList.find((contact) => contact.id == contactId);
  return foundContact;
}

async function removeContact(contactId) {
  const contactsList = await listContacts();
  const index = contactsList.findIndex((contact) => contact.id == contactId);
  if (index === -1) {
    return null;
  }
  const [contact] = contactsList.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));
  return contact;
}

async function addContact(name, email, phone) {
  const contactsList = await listContacts();
  const newContact = {
    id: String(Number(contactsList[contactsList.length - 1].id) + 1),
    name,
    email,
    phone,
  };

  contactsList.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contactsList));
  return newContact;
}
module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
