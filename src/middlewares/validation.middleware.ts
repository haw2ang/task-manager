import { Request, Response, NextFunction } from "express";
import Joi from "joi";

const options = {
  errors: {
    wrap: {
      label: "",
    },
  },
};

export const validateTask = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    status: Joi.string().valid("pending", "in-progress", "completed"),
  });

  const { error } = schema.validate(req.body, options);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
    return;
  }

  next();
};

export const validateLogin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  });

  const { error } = schema.validate(req.body, options);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
    return;
  }

  next();
};
