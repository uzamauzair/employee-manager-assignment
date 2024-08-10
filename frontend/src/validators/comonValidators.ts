import * as yup from "yup"

export const emailValidator = yup
    .string()
    .email("Invalid email address")
    .required("Email is required");

export const nameValidator = yup
    .string()
    .matches(/^[A-Za-z]+$/, "Name must contain only alphabets")
    .min(6, "Name must be at least 6 characters")
    .max(10, "Name must be at most 10 characters")
    .required("Name is required");
