import * as yup from 'yup';

export const resetPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .min(8, 'Too short!')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
});