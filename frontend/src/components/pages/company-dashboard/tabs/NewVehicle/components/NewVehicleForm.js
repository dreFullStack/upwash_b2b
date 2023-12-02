// React
import {useRef, useEffect} from 'react';

// MUI components
import {
  Box,
  FormControl,
  Typography,
  Checkbox,
  CircularProgress 
} from '@mui/material';

// UI components
import PrimaryButton from '../../../../../ui/PrimaryButton';
import Label         from '../../../../../ui/institutional/Label';
import Input         from '../../../../../ui/institutional/Input';
import ErrorMessage  from '../../../../../ui/ErrorMessage';
import GroupedSelect from '../../../../../ui/GroupedSelect';

// axios
import axios from 'axios';

// useForm
import { useForm } from "react-hook-form";

// Redux
import {useSelector} from "react-redux";

// generateRandomVehicleData
import generateRandomVehicleData from '../../../../../../utils/generateRandomVehicleData';

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

function NewVehicleForm() {

  const vehicleCategories = useSelector(state => state?.companyDashboard?.vehiclesCategories);
  const vehicleCategoriesDropdownOptions = getVehicleCategoriesDropdownOptions(vehicleCategories);

  console.log("NewVehicleForm; vehicleCategories -> ", vehicleCategories);
  console.log("NewVehicleForm; vehicleCategoriesDropdownOptions -> ", vehicleCategoriesDropdownOptions);

  const randomVehicleData = generateRandomVehicleData();
  console.log("NewVehicleForm; randomVehicleData -> ", randomVehicleData);

  const formRef  = useRef();

  // TODO: figure out how to register grouped select using react-hook-form
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
      name: randomVehicleData.name,
      licensePlate: randomVehicleData.licensePlate,
      country: "Suomi",
      color: "red",
      vin: randomVehicleData.vin,
      make: "BMW",
      model: "EQS",
      year: 2021,
    },
  }); 

  console.log("NewVehicleForm; errors -> ", errors);
  console.log("NewVehicleForm; isSubmitSuccessful -> ", isSubmitSuccessful);

  const onSubmit = async ({
    vehicleTypeId,
    name,
    licensePlate,
    country,
    color,
    vin,
    make,
    year,
    model,
  }) => {

    console.log("New vehicle form submitted!");
    console.log("vehicleTypeId -> ", vehicleTypeId);
    console.log("name -> ", name);
    console.log("licensePlate -> ", licensePlate);
    console.log("country -> ", country);
    console.log("color -> ", color);
    console.log("vin -> ", vin);
    console.log("make -> ", make);
    console.log("year -> ", year);
    console.log("model -> ", model);

    try {

      const accessToken = localStorage.getItem('accessToken');

      const response = await axios.post('http://localhost:5000/api/v1/vehicles/newVehicle', {
        name: name,
        licensePlate: licensePlate,
        country: country,
        color: color,
        vin: vin,
        make: make,
        year: 2023,
        model: model,
        vehicleTypeId: +vehicleTypeId,
        fleetId: +new URLSearchParams(window.location.search).get("fleetId")
      }, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      console.log('response -> ', response);

      // Redirect to '/company-dashboard'
      window.location.href = '/company-dashboard/fleets-management';
      
    } catch (error) {

      console.log("error -> ", error);
      const errorType = error.response.data.errorType;

      if(errorType === "accessToFleetDenied"){
        setError('accessToFleetDenied', {
          message: error.response.data.message,
        });
      }

      else if(errorType === "nonUniqueLicensePlate"){
        setError('nonUniqueLicensePlate', {
          message: error.response.data.message,
        });
      }

      else if(errorType === "nonUniqueVin"){
        setError('nonUniqueVin', {
          message: error.response.data.message,
        });
      }

      else if(errorType === "maxFleetVehiclesReached"){
        setError('maxFleetVehiclesReached', {
          message: error.response.data.message,
        });
      }

      else{
        console.error(error);
      }

      console.error(error);
    }

  };

  // Set default value once vehicleCategories are available
  useEffect(() => {
    if(
      getValues("vehicleTypeId") === null &&
      vehicleCategoriesDropdownOptions?.[0]?.options?.[0]?.value
    ){
      setValue("vehicleTypeId", +vehicleCategoriesDropdownOptions?.[0]?.options?.[0]?.value);
      console.log("NewVehicleForm; useEffect; vehicleTypeId init -> ", getValues("vehicleTypeId"), " => ", +vehicleCategoriesDropdownOptions?.[0]?.options?.[0]?.value);
    }
  }, [setValue, vehicleCategoriesDropdownOptions, getValues]);

  if(!vehicleCategories.length){
    return "Loading...";
  }

  return (
    <Box 
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        maxWidth: "500px",
        padding: "15px",
        border: "1px #b3b2ba50 solid",
        borderRadius: "5px",
        boxShadow: "0px 2.5px 2.5px 0px #b3b2ba50"
      }}
      ref={formRef}
    >

      {/* Form title */}
      <Typography
        sx={{
          fontFamily: 'FKGrotesk-Bold',
          marginBottom: '10px',
        }}
      >
        Import Vehicle
      </Typography>

      <Box 
        sx={{
          maxWidth: "250px",
        }}
      >
        <Label>Vehicle Type</Label>

        <GroupedSelect 
          defaultValue={
            vehicleCategoriesDropdownOptions?.[0]?.options?.[0]
          }
          groupedOptions={vehicleCategoriesDropdownOptions} 
          onChange={(selectedOption) => {
            setValue("vehicleTypeId", selectedOption.value);
          }}
        />
      </Box>

      {/* Name */}
      <FormControl>
        <Label>Name</Label>
        <Input
          {...register("name", 
            { 
              required: "Vehicle name is required",
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

      {/* Error messages */}
      {
        Object.keys(errors).length !== 0 && (
          <Box 
            sx={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
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
            {errors.nonUniqueLicensePlate   && <ErrorMessage>{errors.nonUniqueLicensePlate.message}</ErrorMessage>}
            {errors.nonUniqueVin            && <ErrorMessage>{errors.nonUniqueVin.message}</ErrorMessage>}
            {errors.maxFleetVehiclesReached && <ErrorMessage>{errors.maxFleetVehiclesReached.message}</ErrorMessage>}
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

      {/* Submit button */}
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
}

export default NewVehicleForm;