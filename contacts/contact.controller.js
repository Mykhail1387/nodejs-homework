import Contact from './contact.model';

export const listContacts = async (req, res) => {
    try {
        const contacts = await Contact.listContacts(req.query);
        res.json(contacts)
        console.log('listContacts:', contacts);
    } catch (err) {
        console.log(err);
        res.status(500).send('bad request')
    }
}

export const createContactController = async (req, res) => {
    try {
        const createdContact = await Contact.createContact(req.body);
        res.json(createdContact);
        console.log('createContactController:', createdContact);
    } catch (err) {
        res.status(500).send('server error');
    }
}

export const getContactByIdController = async (req, res) => {
    try {
        const contact = await Contact.getContactById(req.params.id);
        res.json(contact);
        console.log('getContactByIdController:', contact);
    } catch (err) {
        res.status(500).send('server error');
    }
}

export const deleteContactController = async (req, res) => {
    try {
        const contact = await Contact.deleteContact(req.params.id);
        res.json(contact);
        console.log('deleteContactController:', contact);
    } catch (err) {
        res.status(500).send('server error');
    }
}

export const updateContactController = async (req, res) => {
    try {
        const contact = await Contact.updateContact(req.body);
        res.json(contact);
        console.log('updateContactController:', contact);
    } catch (err) {
        res.status(500).send('server error');
    }
}