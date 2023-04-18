import { RequestHandler } from 'express';
import Joi from 'joi';

export const createSchema = Joi.object({
  description: Joi.string().required(),
  user: Joi.number().required(),
  date: Joi.date().required(),
});

export const genericValidation =
  (schema: any): RequestHandler =>
  (req, res, next) => {
    const { error, value } = schema.validate({
      ...req.body,
      ...req.params,
      ...req.query,
    });

    if (error) {
      return error.details.forEach((e: any) => {
        const str = e.message.substring(
          e.message.indexOf('"') + 1,
          e.message.lastIndexOf('"')
        );

        res.status(400).json({
          status: false,
          message: e.message,
          data: null,
        });
      });
    }

    next();
  };
