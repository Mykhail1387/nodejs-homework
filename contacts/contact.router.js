import { Router } from 'express';
import {
    listContacts,
    createContactController,
    getContactByIdController,
    updateContactController,
    deleteContactController
} from './contact.controller';
import { contactValidateMiddleware } from './contact.validator';


const contactRouter = Router();

contactRouter.get('/', listContacts)
contactRouter.get('/:id', getContactByIdController)
contactRouter.post('/', contactValidateMiddleware, createContactController)
contactRouter.delete('/:id', deleteContactController)
contactRouter.put('/', updateContactController)


export default contactRouter;