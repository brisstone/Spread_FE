import { string } from "yup";

export const PasswordSchema = string()
  .required("Mot de passe requis")
  .min(6, "Votre mot de passe doit contenir au moins 6 caractères");

export const EmailSchema = string()
  .required("Votre email est requis")
  .email("L'e-mail doit être dans un format valide");

export const UuidSchema = string().required().uuid();

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const PhoneSchema = string().matches(
  phoneRegExp,
  "Le numéro de téléphone n'est pas valide"
);
