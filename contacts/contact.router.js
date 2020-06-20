const express = require('express');

const contactController = require('./contact.controller');

const contactRouter = express.Router();


contactRouter.get('/', contactController.listContacts);

contactRouter.get('/:contactId', contactController.getById);

contactRouter.post('/', contactController.validateAddContact, contactController.addContact);

contactRouter.delete('/:contactId', contactController.removeContact);

contactRouter.patch('/:contactId', contactController.validateUpdateContact, contactController.updateContact);

exports.contactRouter = contactRouter;