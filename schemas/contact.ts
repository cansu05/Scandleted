import * as yup from "yup";

export type ContactFormValues = {
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  phone: string;
};

export const contactSchema: yup.ObjectSchema<ContactFormValues> = yup.object({
  fullName: yup.string().required("Full name is required."),
  address: yup.string().required("Address is required."),
  city: yup.string().required("City is required."),
  postalCode: yup
    .string()
    .required("Postal code is required.")
    .matches(/^[A-Za-z0-9 -]{3,12}$/, "Enter a valid postal code."),
  phone: yup
    .string()
    .required("Phone is required.")
    .matches(/^[0-9()+\- ]{7,20}$/, "Enter a valid phone number."),
});
