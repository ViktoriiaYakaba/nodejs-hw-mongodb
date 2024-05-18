import { ContactsCollection } from "../db/models/contact.js";
import { calculatePaginationData } from "../utils/parsePaginationParams.js";
import { SORT_ORDER } from "../constans/index.js";


export const getAllContacts = async (page = 1,
    perPage = 4,
    sortOrder = SORT_ORDER.ASC,
    sortBy = 'name',
) => {
    const limit = perPage;
    const skip = (page - 1) * perPage;

    const contactsQuery = ContactsCollection.find();
    const contactsCount = await ContactsCollection.find().merge(contactsQuery).countDocuments();
    const contacts = await contactsQuery.skip(skip).limit(limit).sort({[sortBy]: sortOrder}).exec();
    const paginationData = calculatePaginationData(contactsCount, perPage, page);


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
