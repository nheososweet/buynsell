import * as yup from "yup";
import { requireMessage } from "./string.utils";
export const buildYupSchema = (fields: any[]) => {
  const shape: any = {};

  fields.forEach((field) => {
    let validator = yup.string().required(requireMessage(field.name));

    shape[field.name] = validator;
  });

  return yup.object().shape(shape);
};
