import Joi from 'joi';

export const creaContactSchema = Joi.object({
    name: Joi.string().min(3).max(20).required().messages({
        'string.base': 'Username should be a string',
        'string.min': 'Username should have at least {#limit} characters',
        'string.max': 'Username should have at most {#limit} characters',
        'any.required': 'Username is required',
    }),
    phoneNumber: Joi.string().required(),
    email: Joi.string().email().required(),
    isFavourite: Joi.boolean().required(),
    contactType: Joi.string().valid('work', 'home', 'personal').required(),
    createdAt: Joi.date().iso().required(),
    updatedAt: Joi.date().iso().required(),
});

export const updateContactSchema = Joi.object({
    name: Joi.string().min(3).max(20),
    phoneNumber: Joi.string().required(),
    email: Joi.string().email().required(),
    isFavourite: Joi.boolean().required(),
    contactType: Joi.string().valid('work', 'home', 'personal').required(),
    createdAt: Joi.date().iso().required(),
    updatedAt: Joi.date().iso().required(),
});


