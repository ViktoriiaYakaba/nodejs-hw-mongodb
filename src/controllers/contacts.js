import { getAllContacts, getContactsById, createContacts, deleteContact, updateContact} from "../services/contacts.js";
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

export const createContactController = async (res, req) => {
    const contact = await createContacts(req.body);

    res.status(201).json({
    status: 201,
    message: `Successfully created a contact!`,
    data: contact,
  });
}

export const deleteContactController = async (req, res) => {
    const { contactId } = req.params;

    const contact = await deleteContact(contactId);

    if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.status(204).send();
}

export const updateContactController = async (res, req) => {
    const { contactId } = req.params;

    const result = await updateContact(contactId, req.body, {
        upsert: true,
    });

     if (!result) {
    next(createHttpError(404, 'Contact not found'));
    return;
    };

    const status = result.isNew ? 201 : 200;

     res.status(status).json({
    status,
    message: `Successfully upserted a contact!`,
    data: result.contact,
  });
}

export const patchContactController = async (req, res) => {
     const { contactId } = req.params;
  const result = await updateContact(contactId, req.body);

  if (!result) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.json({
    status: 200,
    message: `Successfully patched a contact!`,
    data: result.contact,
  });
}
