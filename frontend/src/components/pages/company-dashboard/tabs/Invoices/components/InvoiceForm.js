import React, { 
  useRef, 
  useState,
  useEffect
} from "react";

import {
  Box,
  Typography,
  FormControl,
  ToggleButtonGroup,
  ToggleButton,
  Checkbox,
} from "@mui/material";

// UI components
import PrimaryButton  from "../../../../../ui/PrimaryButton";
import OutlinedButton from "../../../../../ui/OutlinedButton";
import Label          from "../../../../../ui/institutional/Label";
import Input          from "../../../../../ui/institutional/Input";
import ErrorMessage   from "../../../../../ui/ErrorMessage";

// useForm
import { useForm } from "react-hook-form";

// useSelector
import { useSelector } from "react-redux";

// axios
import axios from "axios";

function InvoiceForm({
  invoiceInfo,
  setInvoiceInfo,
  setIsEditMode,
}) {
  const formRef = useRef();

  const [ cancelIsDisabled, setCancelIsDisabled ] = useState(false);

  useEffect(() => {
    if (!invoiceInfo) {
      return setCancelIsDisabled(true);
    };
  }, [invoiceInfo]);

  // State for MUI ToggleButtonGroup
  const [ deliveryType, setDeliveryType ] = useState("");

  console.log("parent delivery type => ", deliveryType);
  // Selecting user email to provide in the form if form uses default email
  const userEmail = useSelector(state => state.user.email);
  // State for MUI Email Checkbox
  const [ useDefaultEmail, setUseDefaultEmail ] = useState(true);
  // State for MUI Post Checkbox
  const [ useDefaultAddress, setUseDefaultAddress ] = useState(true);

  // Initializing hook form
  const {
    register,
    handleSubmit,
    formState: {
      errors,
    },
    setError,
  } = useForm({
    defaultValues: {
      companyName: "",
      companyNumber: "",
      companyAddress: "",
      companyPostCode: "",
      contactPersonName: "",
      contactPersonNumber: "",
      verkkolaskutusosoite: "",
      operaattoritunnus: "",
      email: "",
      invoicingAddress: "",
      invoicingPostCode: "",
      ...(invoiceInfo || {})
    }
  });

  const onSubmit = async ({
    companyName,
    companyNumber,
    companyAddress,
    companyPostCode,
    contactPersonName,
    contactPersonNumber,
    verkkolaskutusosoite,
    operaattoritunnus,
    email,
    invoicingAddress,
    invoicingPostCode,
  }) => {

    // if (useDefaultAddress) {
    //   setValue("email", userEmail);
    // }

    try {
      const res = await axios.post(`http://localhost:5000/api/v1/invoices/newInvoiceInfo`, {
        companyName,
        companyNumber,
        companyAddress,
        companyPostCode,
        contactPersonName,
        contactPersonNumber,
        deliveryType,
        verkkolaskutusosoite,
        operaattoritunnus,
        email: useDefaultEmail ? userEmail : email,
        invoicingAddress: useDefaultAddress ? companyAddress : invoicingAddress,
        invoicingPostCode: useDefaultAddress ? companyPostCode : invoicingPostCode,
      });

      console.log('res -> ', res);

      setInvoiceInfo(res.data);
      setIsEditMode(false);
    } catch (err) {
      setError("serverError", {
        message: "Some error occurred while saving your invoice information. Please try again later or give us a call."
      })
    }
  };

  console.log(errors);
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
        Company details
      </Typography>
      <Box
        sx={{
          maxWidth: "90%",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {/* Company Name */}
        <FormControl>
          <Label>
            Company Name
          </Label>
          
          <Input 
            {...register("companyName",
              {
                required: "Company name is required",
              }
            )}
          />
        </FormControl>
        
        {/* Company Number */}
        <FormControl>
          <Label>
            Company Number
          </Label>
          
          <Input 
            {...register("companyNumber",
              {
                required: "Company number is required"
              }
            )}
          />
        </FormControl>

        {/* Address */}
        <FormControl>
          <Label>
            Address
          </Label>
          
          <Input 
            {...register("companyAddress",
              {
                required: "Address is required"
              }
            )}
          />
        </FormControl>

        {/* Company post code */}
        <FormControl>
          <Label>
            Post code
          </Label>
          
          <Input 
            {...register("companyPostCode",
              {
                required: "Post code is required"
              }
            )}
          />
        </FormControl>
      </Box>

      <Typography
        sx={{
          fontFamily: "FKGrotesk-Bold",
          margin: "20px 0 10px",
        }}
      >
        Contact person details
      </Typography>
      <Box
        sx={{
          maxWidth: "90%",
          display: "flex",
          flexDirection: "column",
          gap: "10px"
        }}
      >
        {/* Contact Person Name */}
        <FormControl>
          <Label>
            Name
          </Label>
          
          <Input 
            {...register("contactPersonName",
              {
                required: "Contact person name is required"
              }
            )}
          />
        </FormControl>

        {/* Contact Person Number */}
        <FormControl>
          <Label>
            Phone number
          </Label>
          
          <Input 
            {...register("contactPersonNumber",
              {
                required: "Contact person number is required",
                pattern: {
                  value: /^[0-9+]+$/,
                  message: "Please enter a valid phone number"
                }
              }
            )}
          />
        </FormControl>
      </Box>
      
      {/* INVOICE DELIVERY TYPE */}
      <Box
        sx={{
          maxWidth: "90%",
          gap: "10px"
        }}
      >
        <Typography
          sx={{
            fontFamily: "FKGrotesk-Bold",
            margin: "20px 0 10px",
          }}
        >
          Invoice delivery type
        </Typography>

        <ToggleButtonGroup
          color="primary"
          exclusive
          aria-label="Platform"
          value={deliveryType}
          onChange={(event, newDeliveryType) => setDeliveryType(newDeliveryType)}
          sx={{
            width: "100%"
          }}
        >
          <ToggleButton 
            value="VERKKOLASKU"
            sx={{
              width: "33%"
            }}
          >
            VERKKOLASKU
          </ToggleButton>
          <ToggleButton 
            value="EMAIL"
            sx={{
              width: "33%"
            }}
          >
            EMAIL
          </ToggleButton>
          <ToggleButton 
            value="POST"
            sx={{
              width: "33%"
            }}
          >
            POST
          </ToggleButton>
        </ToggleButtonGroup>
        <Box
          sx={{
            maxWidth: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            marginTop: "10px",
          }}
        >
        {deliveryType === "VERKKOLASKU" &&
          <>
            <FormControl>
              <Label>
                Verkkolaskutusosoite
              </Label>
              <Input 
                {...register("verkkolaskutusosoite")}
              />
            </FormControl>
            <FormControl>
              <Label>
                Operaattoritunnus
              </Label>
              <Input 
                {...register("operaattoritunnus")}
              />
            </FormControl>
          </>
        }
        {deliveryType === "EMAIL" &&
          <>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "5px"
              }}
            >
              <Checkbox
                checked={useDefaultEmail}
                onChange={() => setUseDefaultEmail(!useDefaultEmail)}
              />
              <Typography
                sx={{
                  fontSize: "1rem"
                }}
              >
                Use the same email that I am signed up by
              </Typography>
            </Box>
            
            {!useDefaultEmail &&
              <FormControl>
                <Label>
                  Email
                </Label>
                <Input 
                  {...register("email", 
                    {
                      required: true
                    }
                  )}
                />
              </FormControl>
            }
          </>
        }

        {deliveryType === "POST" &&
          <>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "5px"
              }}
            >
              <Checkbox 
                checked={useDefaultAddress}
                onChange={() => setUseDefaultAddress(!useDefaultAddress)}
              />
              <Typography
                sx={{
                  fontSize: "1rem"
                }}
              >
                Use my company address
              </Typography>
            </Box>
            {!useDefaultAddress &&
              <>
                <FormControl>
                  <Label>
                    Address
                  </Label>
                  <Input 
                    {...register("invoicingAddress", 
                      {
                        required: true,
                      }
                    )}
                  />
                </FormControl>
                <FormControl>
                  <Label>
                    Post Code
                  </Label>
                  <Input 
                    {...register("invoicingPostCode", 
                      {
                        required: true,
                        pattern: {
                          value: /^[0-9]+$/,
                          message: "Please enter a valid post code"
                        }
                      }
                    )}
                  />
                </FormControl>
              </>
            }
          </>
        }
        </Box>

      </Box>
      
      {/* Error messages */}
      {
        Object.keys(errors).length !== 0 && (
          <Box
            sx={{
              margin: "10px 0"
            }}
          >
            {/* Frontend useForm errors */}
            {errors.companyName && <ErrorMessage>{errors.companyName.message}</ErrorMessage>}
            {errors.companyNumber && <ErrorMessage>{errors.companyNumber.message}</ErrorMessage>}
            {errors.companyAddress && <ErrorMessage>{errors.companyAddress.message}</ErrorMessage>}
            {errors.contactPersonName && <ErrorMessage>{errors.contactPersonName.message}</ErrorMessage>}
            {errors.contactPersonNumber && <ErrorMessage>{errors.contactPersonNumber.message}</ErrorMessage>}
            {errors.verkkolaskutusosoite && <ErrorMessage>{errors.verkkolaskutusosoite.message}</ErrorMessage>}
            {errors.operaattoritunnus && <ErrorMessage>{errors.operaattoritunnus.message}</ErrorMessage>}
            {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
            {errors.invoicingAddress && <ErrorMessage>{errors.invoicingAddress.message}</ErrorMessage>}
            {errors.invoicingPostCode && <ErrorMessage>{errors.invoicingPostCode.message}</ErrorMessage>}
            {/* Frontend MUI components state errors */}
            {!deliveryType && <ErrorMessage>Delivery type is required</ErrorMessage>}
            {/* Fallback server error */}
            {errors.serverError && <ErrorMessage>{errors.serverError.message}</ErrorMessage>}
          </Box>
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
          onClick={() => setIsEditMode(false)}
          disabled={cancelIsDisabled}
        >Cancel</OutlinedButton>
      </Box>
    </Box>
  );
};

export default InvoiceForm;