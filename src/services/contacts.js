import { ContactsCollection } from "../db/models/contact.js";
import { calculatePaginationData } from "../utils/calculatePaginationData.js";
import { SORT_ORDER } from "../constans/index.js";
import { parseFilterParams } from "../utils/parseFilterParams.js";

export const getAllContacts = async (page, perPage, sortBy = 'name', sortOrder = SORT_ORDER.ASC, filter = {}) => {
  const limit = parseInt(perPage, 10);
  const skip = (parseInt(page, 10) - 1) * limit;

  const parsedFilter = parseFilterParams(filter);
  const contactsQuery = ContactsCollection.find().skip(skip).limit(limit).sort({[sortBy]: sortOrder});
  const contactsCount = await ContactsCollection.countDocuments(parsedFilter);
  const contacts = await contactsQuery.exec();
  const paginationData = calculatePaginationData(contactsCount, limit, parseInt(page, 10));

  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactsById = async (contactId) => {
    const contact = await ContactsCollection.findById(contactId);
    return contact;
};

export const createContacts = async (payload) => {
    const contact = await ContactsCollection.create(payload);
    return contact;
};

export const deleteContact = async (contactId) => {
    const contact = await ContactsCollection.findOneAndDelete({
        _id: contactId,
    });

    return contact;
};

export const updateContact = async (contactId, payload, options = {}) => {

    const rawResult = await ContactsCollection.findOneAndUpdate(
        { _id: contactId },
        payload,
        {
        new: true,
        includeResultMetadata: true,
        ...options,
    },);

    if (!rawResult || !rawResult.value) return null;

    return {
        contact: rawResult.value,
        isNew: Boolean(rawResult?.lastErrorObject?.upserted),
    };
};
