const funkOnContacts = require('../contacts');
const Joi = require('joi');
const contacts = require('../db/contacts.json');

class contactController {
    listContacts = (req, res, next) => {
        funkOnContacts.listContacts();
        return res.status(200).json(contacts);
    }

    getById = (req, res, next) => {
        funkOnContacts.getContactById(parseInt(req.params.contactId));

        const contactId = parseInt(req.params.contactId);
        const targetContactIndex = contacts.findIndex(contact => contact.id === contactId);

        if (targetContactIndex === -1) {
            res.status(404).json("Not found")
        }
        return res.status(200).json(contacts[targetContactIndex]);
    }

    addContact = (req, res, next) => {
        const newContact = {
            id: contacts.length + 1,
            ...req.body
        }
        const { name, email, phone } = req.body;
        funkOnContacts.addContact(name, email, phone);

        contacts.push(newContact);
        res.status(201).json(newContact);
    }

    removeContact = (req, res, next) => {
        const contactId = parseInt(req.params.contactId);
        funkOnContacts.removeContact(contactId);
        const targetContactIndex = contacts.findIndex(contact => contact.id === contactId);

        if (targetContactIndex === -1) {
            res.status(404).json('Not found')
        }
        res.status(200).json('contact deleted');
        contacts.splice(targetContactIndex, 1);
    }

    updateContact = (req, res, next) => {
        const contactId = parseInt(req.params.contactId);
        funkOnContacts.updateContact(contactId, req.body);

        const targetContactIndex = contacts.findIndex(contact => contact.id === contactId)
        if (targetContactIndex === -1) {
            res.status(404).json("Not found")
        };

        contacts[targetContactIndex] = {
            ...contacts[targetContactIndex],
            ...req.body
        }
        return res.status(200).send(contacts);
    }

    validateAddContact = (req, res, next) => {
        const createContactRules = Joi.object({
            name: Joi.string().required(),
            email: Joi.string().required(),
            phone: Joi.string().required(),
        })
        const result = Joi.validate(req.body, createContactRules);
        if (result.error) {
            return res.status(400).json("missing required name field")
        }
        next();
    }

    validateUpdateContact = (req, res, next) => {
        const updateContactRules = Joi.object({
            name: Joi.string().required(),
            email: Joi.string().required(),
            phone: Joi.string().required(),
        })
        const result = Joi.validate(req.body, updateContactRules);
        if (result.error) {
            return res.status(400).json("missing fields")
        }
        next();
    }
}

module.exports = new contactController();