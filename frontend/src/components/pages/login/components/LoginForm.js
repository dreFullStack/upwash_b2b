// React
import React, {
  useRef
} from 'react';

// MUI components
import {
  Box,
  FormControl,
  Typography,
  Checkbox,
  CircularProgress 
} from '@mui/material';

// UI components
import PrimaryButton from '../../../ui/PrimaryButton';
import Label         from '../../../ui/Label';
import Input         from '../../../ui/Input';
import ErrorMessage  from '../../../ui/ErrorMessage';

// axios
import axios from 'axios';

// useForm
import { useForm } from "react-hook-form";

function LoginForm() {

    const formRef  = useRef();

    const { 
      register, 
      handleSubmit, 
      formState: { 
        errors, 
        isSubmitSuccessful 
      }, 
      setError,
      clearErrors,
      // reset 
    } = useForm({
      defaultValues: {
        email: 'test1@123.com',
        password: '123456',
      },
      criteriaMode: "all",
    });

    const onSubmit = async ({email, password}) => {

      console.log("Form submitted!");

      try {

        const response = await axios.post('http://localhost:5000/api/v1/auth/login', {
          email,
          password
        });

        console.log('response -> ', response);

        // Handle the response data
        // Assuming the response contains a success flag or status code indicating a successful login
        // if (response.data.success) {
        if (response.data.accessToken) {

          // Store the token in localStorage
          window.localStorage.setItem('accessToken',  response.data.accessToken);
          window.localStorage.setItem('refreshToken', response.data.refreshToken);

          // Store the user in localStorage
          window.localStorage.setItem('user', JSON.stringify(response.data.user));

          // Redirect to '/company-dashboard'
          window.location.href = '/company-dashboard/fleets-management';

        } else {

          setError('loginError', { 
            type: 'invalidCredentials',
            message: 'Invalid credentials',
          });

        }
        
      } catch (error) {

        setError('loginError', { 
          type: 'invalidCredentials',
          message: 'Invalid credentials',
        });

        // Handle any errors that occur during the request
        console.error(error);
      }

    };

    return (
      <Box 
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          borderRadius: "10px",
        }}
        ref={formRef}
      >

        {/* Email */}
        <FormControl>
          <Label>Email</Label>
          <Input
            {...register("email", 
              { 
                required: "Email is required",
                onChange: () => {
                  clearErrors('loginError');
                }
              }
            )}
            required
          />
        </FormControl>

        {/* Password */}
        <FormControl>
          <Label>Password</Label>
          <Input
					  {...register("password", 
              { 
                required: "Password is required",
                onChange: () => {
                  clearErrors('loginError');
                }
              }
            )}
            required
            type="password"
          />
        </FormControl>

        {/* Error messages */}
        {
          Object.keys(errors).length !== 0 && (
            <Box 
              sx={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {errors.email                     && <ErrorMessage>{errors.email.message}</ErrorMessage>}
              {errors.password                  && <ErrorMessage>{errors.password.message}</ErrorMessage>}
              {errors.terms_and_privacy_checked && <ErrorMessage>{errors.terms_and_privacy_checked.message}</ErrorMessage>}
              {errors.loginError                && <ErrorMessage>{errors.loginError.message}</ErrorMessage>}
            </Box>
          )
        }

        {/* Redirect message */}
        {
          isSubmitSuccessful && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}
            >
              <CircularProgress 
                size={20}
                color="success"
              />
              <Typography 
                sx={{ 
                  fontSize: '16px'
                }}>
                Redirecting to dashboard...
              </Typography>
            </Box>
          )
        }

        {/* Terms and conditions and Privacy Policy */}
        <Box sx={{
          display: 'flex',
        }}>
          <Checkbox 
            sx={{
              color: '#e5e4e9',
            }}
            inputProps={{ 'aria-label': 'controlled' }}
            {...register("terms_and_privacy_checked", {
              validate: (isChecked) => {
                if(isChecked) return true;
                return "You must agree with the Terms and Conditions and Privacy Policy";
              }
            })}
          />
          <Typography 
            sx={{
              '&>a': {
                color: '#3b74e7',
                textDecoration: 'none',
              }
            }}
          >
            I agree with all <a href="/terms-and-conditions">Terms and Conditions</a> and <a href="/privacy-policy">Privacy Policies</a> of upwash
          </Typography>
        </Box>

        {/* Submit button */}
        <PrimaryButton 
          type="submit"
          sx={{
            width: 'fit-content',
            fontFamily: 'FKGrotesk-Regular',
            fontSize: '14px',
          }}
        >Submit</PrimaryButton>

        <Typography sx={{
          fontSize: '16px',
          fontFamily: 'FKGrotesk-Regular',
          color: '#69696d',
          marginTop: '10px',

          '&>a': {
            color: 'black',
          }
        }}>
          Don't have an account? <a href="/register">Apply</a>
        </Typography>

      </Box>
    )
}

export default LoginForm;