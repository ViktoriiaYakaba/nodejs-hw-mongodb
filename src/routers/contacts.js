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
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';

const router = Router();

router.use(authenticate);

router.get('/', ctrlWrapper(getContactsController));

router.get('/:contactId', ctrlWrapper(getContactsByIdController));

router.post('', ctrlWrapper(createContactController), upload.single('photo'));

router.delete('/:contactId', ctrlWrapper(deleteContactController));

router.put('/:contactId',validateBody(creaContactSchema), ctrlWrapper(updateContactController), upload.single('photo'));

router.patch('/:contactId', validateBody(updateContactSchema), ctrlWrapper(patchContactController), upload.single('photo'));

 export default router;
