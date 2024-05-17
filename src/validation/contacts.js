import Joi from 'joi';

export const creaContactSchema = Joi.object({
    name: Joi.string().min(3).max(30).required().messages({
        'string.base': 'Username should be a string',
        'string.min': 'Username should have at least {#limit} characters',
        'string.max': 'Username should have at most {#limit} characters',
        'any.required': 'Username is required',
    }),
    phoneNumber: Joi.string().required(),
    email: Joi.string().email().required(),
    isFavourite: Joi.boolean().required(),
    contactType: Joi.string().valid('personal', 'work').required(),
    createdAt: Joi.date().iso().required(),
    updatedAt: Joi.date().iso().required(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  email: Joi.string().email(),
  age: Joi.number().integer().min(6).max(16),
  gender: Joi.string().valid('male', 'female', 'other'),
  avgMark: Joi.number().min(2).max(12),
  onDuty: Joi.boolean(),
});


