import * as Yup from 'yup';

export const SigninValidationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-zA-Z]/, 'Password must contain at least one letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[^a-zA-Z0-9]/, 'Password must contain at least one special character')
    .required('Password is required'),
});

export const SignupValidationSchema = Yup.object({
  email: Yup.string().email('Invalid email').required('Required'),
  name: Yup.string().required('Required'),
  password: Yup.string()
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password must contain at least one letter.')
    .matches(/\d/, 'Password must contain at least one number.')
    .matches(/[!@#$%^&*]/, 'Password must contain at least one special character.')
    .required('Required'),
});
