import { getAllContacts, getContactsById } from "../services/contacts.js";
import createHttpError from 'http-errors';

export const getContactsController = async (res, req, next) => {
 const contacts = await getAllContacts();

      res.status(200).json({
        status: 'success',
        message: 'Successfully found contacts!',
        data: contacts,
      });
}

export const getContactsByIdController = async (res, req, next) => {
     const { contactId } = req.params;
    const contact = await getContactsById(contactId);

     if (!contact) {
    next(createHttpError('Contact not found'));
    return;
  }

      res.status(200).json({
        status: 'success',
        message: `Successfully found contact with id ${contactId}!`,
        data: contact,
      });
}
