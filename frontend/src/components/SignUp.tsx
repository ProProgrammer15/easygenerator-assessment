import React, { useEffect, useState } from 'react';
import { Button, TextField, Box, Typography } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { SignupValidationSchema } from '../models';

const SignUp = () => {
  const navigate = useNavigate();
  const backendUrl = 'http://localhost:3001';
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/app'); // Redirect if authenticated
    }
  }, [navigate]);

  const handleSubmit = async (values: { email: string; name: string; password: string }) => {
    try {
      await axios.post(`${backendUrl}/auth/signup`, values);
      navigate('/app');
    } catch (error) {
      setError('Sign-up failed. Please check your credentials.');
      console.error('Sign-up error:', error);
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
      <Typography variant="h4" gutterBottom>
        Sign Up
      </Typography>
      <Formik
        initialValues={{ email: '', name: '', password: '' }}
        validationSchema={SignupValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <Box display="flex" flexDirection="column" gap={2} width={300} mx="auto">
              <Field
                name="email"
                as={TextField}
                label="Email"
                variant="outlined"
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
              <Field
                name="name"
                as={TextField}
                label="Name"
                variant="outlined"
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
              />
              <Field
                name="password"
                as={TextField}
                type="password"
                label="Password"
                variant="outlined"
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />
              <Typography variant="body2" align="center">
                Already have an account? <a href="/signin">Sign In</a>
              </Typography>
              {error && <Box color="error.main">{error}</Box>}
              <Button type="submit" variant="contained" color="primary">
                Sign Up
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default SignUp;
