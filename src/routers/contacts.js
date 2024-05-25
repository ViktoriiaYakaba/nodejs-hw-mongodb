import { Router } from 'express';
import {
    getContactsByIdController,
    getContactsController,
    createContactController,
    deleteContactController,
    updateContactController,
    patchContactController
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { creaContactSchema, updateContactSchema } from '../validation/contacts.js';

const router = Router();

router.get('/', ctrlWrapper(getContactsController) );

router.get('/:contactId', ctrlWrapper(getContactsByIdController));

router.post('', ctrlWrapper(createContactController));

router.delete('/:contactId', ctrlWrapper(deleteContactController));

router.put('/:contactId',validateBody(creaContactSchema), ctrlWrapper(updateContactController));

router.patch('/:contactId', validateBody(updateContactSchema), ctrlWrapper(patchContactController));

 export default router;
