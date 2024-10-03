import React, { useEffect, useState } from 'react';
import { Button, TextField, Box, Typography } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { SigninValidationSchema } from '../models';

const SignIn = () => {
  const navigate = useNavigate();
  const backendUrl = 'http://localhost:3001';
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/app'); // Redirect if already authenticated
    }
  }, [navigate]);

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      const { data } = await axios.post(`${backendUrl}/auth/signin`, values);
      localStorage.setItem('token', data.token);
      navigate('/app');
    } catch (err) {
      setError('Sign-in failed. Please check your credentials.');
      console.error('Sign-in error:', err);
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
      <Typography variant="h4" gutterBottom>
        Sign In
      </Typography>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={SigninValidationSchema}
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
                error={touched.email && !!errors.email}
                helperText={touched.email && errors.email}
              />
              <Field
                name="password"
                as={TextField}
                type="password"
                label="Password"
                variant="outlined"
                error={touched.password && !!errors.password}
                helperText={touched.password && errors.password}
              />
              <Typography variant="body2" align="center">
                Don't have an account? <a href="/signup">Sign Up</a>
              </Typography>
              {error && <Box color="error.main">{error}</Box>}
              <Button type="submit" variant="contained" color="primary">
                Sign In
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default SignIn;
