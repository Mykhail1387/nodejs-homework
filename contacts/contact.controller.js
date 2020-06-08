const Joi = require('joi');
const contacts = [
    {
        id: 1,
        name: 'Junior',
        email: 'junior@gmail.com',
        phone: '093-333-33-33'
    },
    {
        id: 2,
        name: 'Middle',
        email: 'middle@gmail.com',
        phone: '093-555-55-55'
    },
    {
        id: 3,
        name: 'Senior',
        email: 'senior@gmail.com',
        phone: '093-777-77-77'
    }
];

class contactController {
    listContacts = (req, res, next) => {
        return res.status(200).json(contacts);
    }

    getById = (req, res, next) => {
        const contactId = parseInt(req.params.contactId);

        const targetContactIndex = contacts.findIndex(contact => contact.id === contactId);

        if (targetContactIndex === -1) {
            res.status(404).json("Not found")
        }
        return res.status(200).send(contacts[targetContactIndex]);
    }

    addContact = (req, res, next) => {
        const newContact = {
            id: contacts.length + 1,
            ...req.body
        }
        contacts.push(newContact);
        res.status(201).json(newContact);
    }

    removeContact = (req, res, next) => {
        const contactId = parseInt(req.params.contactId);
        const targetContactIndex = contacts.findIndex(contact => contact.id === contactId);

        if (targetContactIndex === -1) {
            res.status(404).json('Not found')
        }
        res.status(200).json('contact deleted');
        contacts.splice(targetContactIndex, 1);
    }

    updateContact = (req, res, next) => {
        const contactId = parseInt(req.params.contactId);

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