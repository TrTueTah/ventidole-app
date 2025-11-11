import * as yup from 'yup';

export const verifyEmailSchema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
  otp: yup
    .string()
    .length(4, 'OTP must be 4 digits')
    .required('OTP is required'),
});