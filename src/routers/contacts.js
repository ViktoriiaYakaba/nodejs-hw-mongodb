import { Router } from 'express';
import { getContactsByIdController, getContactsController, createContactController, deleteContactController, updateContactController, patchContactController } from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/contacts', ctrlWrapper(getContactsController) );

router.get('/contacts/:contactId', ctrlWrapper(getContactsByIdController));

router.post('/contacts', ctrlWrapper(createContactController));

router.delete('/contacts/:contactId'), ctrlWrapper(deleteContactController);

router.put('/students/:studentId', ctrlWrapper(updateContactController));

router.patch('/students/:studentId', ctrlWrapper(patchContactController));

 export default router;
