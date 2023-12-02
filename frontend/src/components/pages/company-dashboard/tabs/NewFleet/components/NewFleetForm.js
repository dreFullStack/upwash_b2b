import React, {
  useRef,
  useState,
} from "react";

import {
  Box,
  Typography,
  FormControl,
  CircularProgress
} from "@mui/material";

import PrimaryButton  from "../../../../../ui/PrimaryButton";
import OutlinedButton from "../../../../../ui/OutlinedButton";
import Label          from "../../../../../ui/institutional/Label";
import Input          from "../../../../../ui/institutional/Input";
import ErrorMessage   from "../../../../../ui/ErrorMessage";

import { useForm } from "react-hook-form";

import axios from "axios";

function NewFleetForm() {
  const formRef = useRef();

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitSuccessful
    },
    setError,
    clearErrors,
  } = useForm({
    defaultValues: {
      name: "",
      adress: "",
      city: "",
      state: "",
      zip: "",
      country: "",
    }
  });

  const onSubmit = async ({
    name,
    adress,
    city,
    state,
    zip,
    country
  }) => {
    try {
      const res = await axios.post("http://localhost:5000/api/v1/fleets/newFleet?vehiclesSkip=0&vehiclesTake=10", {
        name,
        adress,
        city,
        state,
        zip,
        country
      });
      
      window.location.href = '/company-dashboard/fleets-management';
    } catch (error) {
      const errorType = error.response.data.errorType;      

      if (errorType === "uniqueNameRequired") {
        setError("uniqueNameRequired", {
          message: error.response.data.message,
        });
      }
    };
  };
  
  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "500px",
        padding: "15px",
        border: "1px #b3b2ba50 solid",
        borderRadius: "5px",
        boxShadow: "0px 2.5px 2.5px 0px #b3b2ba50"
      }}
      ref={formRef}
    >
      <Typography
        sx={{
          fontFamily: "FKGrotesk-Bold",
          marginBottom: "10px"
        }}
      >
        New Fleet
      </Typography>
      <Box
        sx={{
          maxWidth: "90%",
          display: "flex",
          flexDirection: "column",
          gap: "10px"
        }}
      >

        {/* Name */}
        <FormControl>
          <Label>
            Name
          </Label>

          <Input 
            {...register("name",
              {
                required: "Fleet name is required"
              }
            )}
            onChange={(e) => {
              clearErrors("uniqueNameRequired");
            }}
          />
        </FormControl>

        <FormControl>
          <Label>
            Address
          </Label>

          <Input 
            {...register("adress",
              {
                required: "Address is required"
              }
            )}
          />
        </FormControl>

        <FormControl>
          <Label>
            City
          </Label>

          <Input 
            {...register("city",
              {
                required: "City is required"
              }
            )}
          />
        </FormControl>

        <FormControl>
          <Label>
            State
          </Label>

          <Input 
            {...register("state",
              {
                required: "State is required (e.g. -> Uusimaa, Pirkanmaa)"
              }
            )}
          />
        </FormControl>

        <FormControl>
          <Label>
            Zip
          </Label>

          <Input 
            {...register("zip",
              {
                required: "ZIP is required"
              }
            )}
          />
        </FormControl>

        <FormControl>
          <Label>
            Country
          </Label>

          <Input 
            {...register("country",
              {
                required: "Country is required"
              }
            )}
          />
        </FormControl>
      </Box>
      
      {
        Object.keys(errors).length !== 0 && (
          <Box
            sx={{
              margin: "10px 0"
            }}
          >
            {/* Frontend useForm errors */}
            {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
            {errors.adress && <ErrorMessage>{errors.adress.message}</ErrorMessage>}
            {errors.city && <ErrorMessage>{errors.city.message}</ErrorMessage>}
            {errors.state && <ErrorMessage>{errors.state.message}</ErrorMessage>}
            {errors.zip && <ErrorMessage>{errors.zip.message}</ErrorMessage>}
            {errors.country && <ErrorMessage>{errors.country.message}</ErrorMessage>}
            {/* Server errors */}
            {errors.uniqueNameRequired && <ErrorMessage>{errors.uniqueNameRequired.message}</ErrorMessage>}
            {/* Fallback server error */}
            {errors.serverError && <ErrorMessage>{errors.serverError.message}</ErrorMessage>}
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
              gap: '10px',
              marginTop: "20px"
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
              Loading...
            </Typography>
          </Box>
        )
      }

      {/* Show success message if form was submitted sucessfully */}
      {
        isSubmitSuccessful && (
          <Typography
            sx={{
              fontFamily: 'FKGrotesk-Regular',
              fontSize: '14px',
              color: '#4caf50',
              marginTop: '10px',
            }}
          >
            Vehicle was successfully imported
          </Typography>
        )
      }

      <Box
        sx={{
          display: "flex",
          gap: "10px"
        }}
      >
       <PrimaryButton
          type="submit"
          sx={{
            width: 'fit-content',
            fontFamily: 'FKGrotesk-Regular',
            fontSize: '14px',
            marginTop: '10px',
          }}
        >Save</PrimaryButton>
        <OutlinedButton 
          sx={{
            width: 'fit-content',
            fontFamily: 'FKGrotesk-Regular',
            fontSize: '14px',
            marginTop: '10px',
          }}
        >Cancel</OutlinedButton>
      </Box>
    </Box>
  )
};

export default NewFleetForm;