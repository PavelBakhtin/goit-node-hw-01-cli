const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");
const contactsPath = path.resolve("db", "contacts.json");
async function readDb() {
  const dataRaw = await fs.readFile(contactsPath);
  const data = JSON.parse(dataRaw);
  return data;
}
async function writeContacts(data) {
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
}
async function listContacts() {
  const contactsList = await readDb();
  return contactsList;
}

async function getContactById(contactId) {
  const contactsList = await readDb();
  const contact = contactsList.filter((contact) => contact.id === contactId);
  return contact;
}

async function removeContact(contactId) {
  const contactsList = await readDb();
  const updatedContactsList = contactsList.filter(
    (contact) => contact.id !== contactId
  );
  await writeContacts(updatedContactsList);
}

async function addContact(name, email, phone) {
  const contactsList = await readDb();
  const newContact = {
    id: nanoid(),
    name: name,
    email: email,
    phone: phone,
  };
  contactsList.push(newContact);
  await writeContacts(contactsList);
}
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
