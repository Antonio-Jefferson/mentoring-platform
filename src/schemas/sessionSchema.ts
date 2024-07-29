import Joi from 'joi';

export const createSessionsSchema = Joi.object({
  mentorId: Joi.number().integer().required().messages({
    'number.base': 'mentorId must be a number',
    'number.integer': 'mentorId must be an integer',
    'any.required': 'mentorId is required'
  }),
  menteeId: Joi.number().integer().required().messages({
    'number.base': 'menteeId must be a number',
    'number.integer': 'menteeId must be an integer',
    'any.required': 'menteeId is required'
  }),
  skillId: Joi.number().integer().required().messages({
    'number.base': 'skillId must be a number',
    'number.integer': 'skillId must be an integer',
    'any.required': 'skillId is required'
  }),
  startTime: Joi.date().iso().required().messages({
    'date.base': 'startTime must be a valid date',
    'date.iso': 'startTime must be in ISO format',
    'any.required': 'startTime is required'
  }),
  endTime: Joi.date().iso().required().greater(Joi.ref('startTime')).messages({
    'date.base': 'endTime must be a valid date',
    'date.iso': 'endTime must be in ISO format',
    'any.required': 'endTime is required',
    'date.greater': 'endTime must be greater than startTime'
  }),
});