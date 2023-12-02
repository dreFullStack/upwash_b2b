import React, { 
  useRef,
  useEffect,
  useState
} from "react";

import PrimaryButton from '../../../../../ui/PrimaryButton';
import OutlinedButton from '../../../../../ui/OutlinedButton';
import Label         from '../../../../../ui/institutional/Label';
import Input         from '../../../../../ui/institutional/Input';
import ErrorMessage  from '../../../../../ui/ErrorMessage';
import GroupedSelect from '../../../../../ui/GroupedSelect';

// useForm
import { useForm } from "react-hook-form";

// Redux
import { useSelector } from "react-redux";

// axios
import axios from "axios";
import { 
  Box,
  FormControl,
  Typography,
  CircularProgress
} from "@mui/material";

// Copy paste from NewVehicleForm. Could be exported to be reused.
function getVehicleCategoriesDropdownOptions(vehicleCategories){

  const result = [];

  for(let i = 0; i < vehicleCategories.length; i++){

    let options = [];

    for(let j = 0; j < vehicleCategories[i].vehicleTypes.length; j++){
        
        options.push({
          value: vehicleCategories[i].vehicleTypes[j].id,
          label: vehicleCategories[i].vehicleTypes[j].code,
        })
  
    }

    result.push({
      label: vehicleCategories[i].code,
      options: options
    })

  }

  return result;

}

function EditVehicleForm() {
  const formRef = useRef();

  const [ vehicleInformation, setVehicleInformation ] = useState();
  console.log(vehicleInformation);

  useEffect(() => {

    const fetchVehicleInformation = async () => {
      const vehicleId = +new URLSearchParams(window.location.search).get("vehicleId");
      console.log("vehicleId -> ", vehicleId, "\n typeof ->", typeof vehicleId);

      const res = await axios.get(`http://localhost:5000/api/v1/vehicles/vehicleInfo?vehicleId=${vehicleId}`);
      
      // NOTE: Could also be dispatched to vehicle information (?)
      return setVehicleInformation(res.data);
    };

    fetchVehicleInformation();
  }, []);

  // Receiving vehicle categories from state for dropdown menu
  const vehicleCategories = useSelector(state => state?.companyDashboard?.vehiclesCategories);
  const vehicleCategoriesDropdownOptions = getVehicleCategoriesDropdownOptions(vehicleCategories);
  
  const { 
    register, 
    handleSubmit, 
    formState: { 
      errors, 
      isSubmitSuccessful 
    }, 
    setError,
    setValue,
    clearErrors,
    getValues
  } = useForm({
    defaultValues: {
      // This field will be set to the first option of the dropdown in useEffect below
      vehicleTypeId: null,
      name: "",
      licensePlate: "",
      country: "",
      color: "",
      vin: "",
      make: "",
      model: "",
      year: "",
    },
  }); 

  // Sets default value once vehicleInformation is available
  useEffect(() => {
    // setValue("vehicleTypeId", vehicleInformation?.vehicleType?.vehicleTypeId);
    setValue("name", vehicleInformation?.name);
    setValue("licensePlate", vehicleInformation?.licensePlate);
    setValue("country", vehicleInformation?.country);
    setValue("color", vehicleInformation?.color);
    setValue("vin", vehicleInformation?.vin);
    setValue("make", vehicleInformation?.make);
    setValue("year", vehicleInformation?.year);
    setValue("model", vehicleInformation?.model);
  }, [vehicleInformation]);

  // Set default value once vehicleCategories are available
  useEffect(() => {
    if(
      getValues("vehicleTypeId") === null &&
      vehicleCategoriesDropdownOptions?.[0]?.options?.[0]?.value
    ){
      setValue("vehicleTypeId", +vehicleInformation?.vehicleType?.vehicleTypeId);
      console.log("NewVehicleForm; useEffect; vehicleTypeId init -> ", getValues("vehicleTypeId"), " => ", +vehicleCategoriesDropdownOptions?.[0]?.options?.[0]?.value);
    }
  }, []);

  // if(!vehicleCategories.length){
  //   return "Loading...";
  // };

  const onSubmit = async ({
    vehicleTypeId,
    name,
    licensePlate,
    country,
    color,
    vin,
    make,
    year,
    model
  }) => {
    console.log("vehicleInformation", vehicleInformation);

    // TODO: Move to catch block once figured how to register GroupedSelect with useForm
    if (!vehicleTypeId) {
      setError("vehicleTypeId", {
        message: "Vehicle type is required"
      })
    };

    try {
      const res = await axios.put('http://localhost:5000/api/v1/vehicles/updateVehicle', {
        vehicleId: +vehicleInformation.id,
        name,
        licensePlate,
        country,
        color,
        vin,
        make,
        year,
        model,
        vehicleTypeId: +vehicleTypeId,
        fleetId: vehicleInformation.fleetId
      });

      window.location.href = '/company-dashboard/fleets-management';
    } catch (error) {
      const errorType = error.response.data.errorType;

      if(errorType === "accessToFleetDenied"){
        setError('accessToFleetDenied', {
          message: error.response.data.message,
        });
      }
    }
  };

  console.log("errors -> ", errors);

  return (
    <Box
      component="form"
      sx={{
        maxWidth: "550px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        padding: "15px",
        border: "1px #b3b2ba50 solid",
        borderRadius: "5px",
        boxShadow: "0px 2.5px 2.5px 0px #b3b2ba50"
      }}
      onSubmit={handleSubmit(onSubmit)}
      ref={formRef}
    >
      {/* Form title */}
      <Typography
        sx={{
          fontFamily: 'FKGrotesk-Bold',
          marginBottom: '10px',
        }}
      >
        Edit Vehicle
      </Typography>

      <Box 
        sx={{
          maxWidth: "250px",
        }}
      >
        <Label>Vehicle Type</Label>

        <GroupedSelect 
          defaultValue={
            vehicleInformation?.vehicleType.code
          }
          groupedOptions={vehicleCategoriesDropdownOptions} 
          onChange={(selectedOption) => {
            setValue("vehicleTypeId", selectedOption.value);
            clearErrors('vehicleTypeId');
          }}
        />
      </Box>

      {/* Name */}
      <FormControl>
        <Label>Name</Label>
        <Input 
          {...register("name",
            {
              required: "Vehicle name is required"
            }
          )}
        />
      </FormControl>

      {/* License plate */}
      <FormControl>
        <Label>License plate</Label>
        <Input
          {...register("licensePlate")}
          onChange={(e) => {
            clearErrors('nonUniqueLicensePlate');
          }}
        />
      </FormControl>

      {/* Country */}
      <FormControl>
        <Label>Country</Label>
        <Input
          {...register("country", 
            { 
              required: "Country is required",
            }
          )}
        />
      </FormControl>

      {/* Color */}
      <FormControl>
        <Label>Color</Label>
        <Input
          {...register("color", 
            { 
              required: "Color is required",
            }
          )}
        />
      </FormControl>

      {/* VIN */}
      <FormControl>
        <Label>VIN</Label>
        <Input
          {...register("vin", 
            { 
              required: "VIN is required",
            }
          )}
          onChange={(e) => {
            clearErrors('nonUniqueVin');
          }}
        />
      </FormControl>

      {/* Make */}
      <FormControl>
        <Label>Make</Label>
        <Input
          {...register("make", 
            { 
              required: "Make is required",
            }
          )}
        />
      </FormControl>

      {/* Year */}
      <FormControl>
        <Label>Year</Label>
        <Input
          {...register("year", 
            { 
              required: "Year is required",
            }
          )}
          type="number"
        />
      </FormControl>

      {/* Model */}
      <FormControl>
        <Label>Model</Label>
        <Input
          {...register("model", 
            { 
              required: "Model is required",
            }
          )}
        />
      </FormControl>

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

      {/* Error messages */}
      {
        Object.keys(errors).length !== 0 && (
          <Box 
            sx={{
              display: 'flex',
              flexDirection: 'column',
            }}
          > 
            {errors.vehicleTypeId           && <ErrorMessage>{errors.vehicleTypeId.message}</ErrorMessage>}
            {errors.name                    && <ErrorMessage>{errors.name.message}</ErrorMessage>}
            {errors.licensePlate            && <ErrorMessage>{errors.licensePlate.message}</ErrorMessage>}
            {errors.country                 && <ErrorMessage>{errors.country.message}</ErrorMessage>}
            {errors.color                   && <ErrorMessage>{errors.color.message}</ErrorMessage>}
            {errors.vin                     && <ErrorMessage>{errors.vin.message}</ErrorMessage>}
            {errors.make                    && <ErrorMessage>{errors.make.message}</ErrorMessage>}
            {errors.year                    && <ErrorMessage>{errors.year.message}</ErrorMessage>}
            {errors.model                   && <ErrorMessage>{errors.model.message}</ErrorMessage>}
            {errors.location                && <ErrorMessage>{errors.location.message}</ErrorMessage>}

            {errors.accessToFleetDenied     && <ErrorMessage>{errors.accessToFleetDenied.message}</ErrorMessage>}
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
          onClick={() => window.location.href = '/company-dashboard/fleets-management'}
        >Cancel</OutlinedButton>
      </Box>
    </Box>
  )
};

export default EditVehicleForm;