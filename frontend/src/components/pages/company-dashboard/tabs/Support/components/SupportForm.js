import React, { useRef } from "react";

// MUI components
import {
  Box,
  FormControl,
  Typography,
} from "@mui/material";

// UI components
import PrimaryButton from "../../../../../ui/PrimaryButton";
import Label         from "../../../../../ui/institutional/Label";
import Input         from "../../../../../ui/institutional/Input";
import Textarea      from "../../../../../ui/Textarea";
import ErrorMessage  from "../../../../../ui/ErrorMessage";

// useForm
import { useForm } from "react-hook-form";

// axios
import axios from "axios";

function SupportForm() {
  const formRef = useRef();

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitSuccessful
    },
    reset,
    setError,
    setValue,
    clearErrors,
    getValues
  } = useForm({
    defaultValues: {
      title: "",
      message: "",
    },
  });

  const onSubmit = async ({
    title,
    message,
  }) => {

    try {
      const response = await axios.post("http://localhost:5000/api/v1/support/newSupportRequest", {
        title,
        message
      });
      reset();
    } catch (error) {
      const errorType = error.response.data.errorType;

      if (errorType === "missingField") {
        setError("missingField", {
          message: error.response.data.message
        });
      } else {
        setError("serverError", {
          message: "Some error occurred while sending your support request. Please try again later or give us a call."
        });
      };
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
          marginBottom: "10px",
        }}
      >
        Having a problem? Drop us a message.
      </Typography>

      <Box
        sx={{
          maxWidth: "90%",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {/* Title */}
        <FormControl>
          <Label>
            Title
          </Label>
          <Input 
            {...register("title",
              {
                required: "Title is required",
                minLength: {
                  value: 4,
                  message: "Title is too short."
                },
                maxLength: {
                  value: 50,
                  message: "Title is too long."
                }
              }
            )}
          />
        </FormControl>

        {/* Message */}
        <FormControl>
          <Label>Message</Label>
          <Textarea
            {...register("message", {
              required: "Please enter your message.",
              maxLength: {
                value: 2000,
                message: "Support request message should not exceed 2000 characters."
              },
              minLength: {
                value: 10,
                message: "Your support request message is too short. Please describe your problem better."
              },
            })}
            placeholder="Describe the problem you are facing here..."
            rows={8}
            multiline
            customStyle={{
              width: "100%",
              "& .MuiInputBase-root": {
                padding: "0px"
              }
            }}
          />
        </FormControl>
        
      </Box>

      {/* Error messages */}
      {
        Object.keys(errors).length !== 0 && (
          <Box
            sx={{
              margin: "10px 0"
            }}
          >
            {/* Frontend errors */}
            {errors.message && <ErrorMessage>{errors.message.message}</ErrorMessage>}
            {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
            {errors.maxLength && <ErrorMessage>{errors.maxLength.message}</ErrorMessage>}
            {errors.minLength && <ErrorMessage>{errors.minLength.message}</ErrorMessage>}

            {/* Backend errors */}
            {errors.missingField && <ErrorMessage>{errors.missingField.message}</ErrorMessage>}
            {/* Fallback error for any unexpected issues on the server */}
            {errors.serverError && <ErrorMessage>{errors.serverError.message}</ErrorMessage>}
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
            Support request was successfully sent
          </Typography>
        )
      }

      <PrimaryButton
        type="submit"
        sx={{
          width: 'fit-content',
          fontFamily: 'FKGrotesk-Regular',
          fontSize: '14px',
          marginTop: '10px',
        }}
      >Submit</PrimaryButton>
    </Box>
  )
};

export default SupportForm;