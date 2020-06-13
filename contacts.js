'use strict';

const { Contact } = require('./contact');
const fs = require('fs');
const path = require('path');
const contactsPath = path.join(__dirname, './db/contacts.json');

const util = require('util');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

exports.listContacts = async () => {
    const contacts = await readFile(contactsPath, 'utf-8');
    const contactsParse = JSON.parse(contacts);
    contactsParse.map(({ name, phone }) => console.log(`${name} - ${phone}`));
    return contactsParse;
}

exports.getContactById = async (contactId) => {
    const contacts = await readFile(contactsPath, 'utf8');
    const contactsParse = JSON.parse(contacts);
    console.log(contactsParse.find(cont => cont.id === contactId));
};

exports.removeContact = async (contactId) => {
    const contactsFromJson = await readFile('./db/contacts.json', 'utf8');
    const contacts = JSON.parse(contactsFromJson);
    const contactsFilter = contacts.filter(cont => cont.id !== contactId);
    console.log(contactsFilter);
    return await writeFile('./db/contacts.json', JSON.stringify(contactsFilter));
}

exports.addContact = async (name, email, phone) => {
    const contactsFromJson = await readFile('./db/contacts.json', 'utf8');
    const contacts = JSON.parse(contactsFromJson);
    const id = contacts[contacts.length - 1].id + 1;
    const contact = new Contact(id, name, email, phone);
    contacts.push(contact);
    console.log(contacts);
    return await writeFile('./db/contacts.json', JSON.stringify(contacts));
}

exports.updateContact = async (contactId, body) => {
    const contactsFromJson = await readFile('./db/contacts.json', 'utf8');
    const contacts = JSON.parse(contactsFromJson);

    const targetContactIndex = contacts.findIndex(contact => contact.id === contactId)

    contacts[targetContactIndex] = {
        ...contacts[targetContactIndex],
        ...body
    }
    console.log('contacts:', contacts);
    return await writeFile('./db/contacts.json', JSON.stringify(contacts));
} 