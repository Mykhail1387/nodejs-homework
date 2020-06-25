import mongoose, { Schema } from 'mongoose';

const contactSchema = new Schema({
    name: String,
    email: String,
    phone: String
});

class Contact {
    constructor() {
        this.contact = mongoose.model('Contact', contactSchema)
    }

    listContacts = (query) => {
        return this.contact.find(query)
    }

    createContact = (contact) => {
        return this.contact.create(contact)
    }

    getContactById = (id) => {
        return this.contact.findById(id)
    }

    deleteContact = (id) => {
        return this.contact.findByIdAndDelete(id)
    }

    updateContact = (contact) => {
        const { id, ...contactModel } = contact;
        return this.contact.findByIdAndUpdate(id, contactModel, { new: true })
    }
}

export default new Contact();
