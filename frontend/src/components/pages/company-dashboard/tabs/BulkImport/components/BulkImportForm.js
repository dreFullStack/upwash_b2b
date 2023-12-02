// React
import {useRef, useEffect} from 'react';

// MUI components
import {
  Box,
  FormControl,
  Typography,
  CircularProgress,
  TextField
} from '@mui/material';

// UI components
import PrimaryButton from '../../../../../ui/PrimaryButton';
import Label         from '../../../../../ui/institutional/Label';
import ErrorMessage  from '../../../../../ui/ErrorMessage';

// axios
import axios from 'axios';

// useForm
import { useForm } from "react-hook-form";

// Redux
import generateRandomVehicleData from '../../../../../../utils/generateRandomVehicleData';

// const testVehiclesCSV = `van-small, Speedster, SPD234, Italy, red, 6789012345, Ferrari, 2023, 488 GTB, Rome
// van-small, Thunderbolt, THB567, Japan, blue, 7890123456, Yamaha, 2022, YZF-R6, Tokyo
// truck-small, MightyHaul, MTH678, United Kingdom, green, 8901234567, Volvo, 2021, FH16, London
// van-small, CityMover, CTM789, Germany, silver, 9012345678, Volkswagen, 2020, Transporter, Berlin
// sedan-medium, MegaTransit, MGT012, USA, yellow, 0123456789, Blue Bird, 2022, Vision, Los Angeles
// van-small, Firebolt, FRB345, Australia, black, 1234567890, Harley-Davidson, 2021, Iron 883, Sydney
// van-small, UrbanDrive, UDV456, Canada, white, 2345678901, Chevrolet, 2020, Spark, Toronto
// truck-large, SuperHauler, SUP789, France, red, 3456789012, Iveco, 2022, Stralis, Paris
// van-small, EcoVoyager, ECV123, Spain, silver, 4567890123, Citroën, 2021, Berlingo, Madrid
// van-small, Lightning, LIG456, Brazil, orange, 5678901234, Kawasaki, 2020, Ninja 650, São Paulo
// van-small, Blaze, BZL123, South Korea, gray, 6789012345, Hyundai, 2021, Veloster, Seoul
// truck-small, PowerGrip, PWG567, India, yellow, 7890123456, Mahindra, 2020, Bolero, Mumbai
// van-small, TurboTransit, TBT789, Russia, white, 8901234567, GAZ, 2022, Gazelle, Moscow
// van-small, Thunderstrike, THS012, China, blue, 9012345678, Honda, 2021, CBR600RR, Beijing
// van-small, AeroSpeed, AER234, Mexico, red, 0123456789, Dodge, 2020, Challenger, Mexico City
// truck-large, MegaMover, MMR567, Germany, silver, 1234567890, MAN, 2022, TGX, Hamburg
// van-small, SwiftCarry, SFC012, USA, black, 2345678901, Chevrolet, 2021, Express, New York City
// sedan-medium, UrbanTransit, UTR345, United Kingdom, white, 3456789012, Alexander Dennis, 2020, Enviro500, London
// van-small, RoadKing, RDK678, Australia, blue, 4567890123, Triumph, 2022, Bonneville T120, Sydney
// van-small, StreetRunner, STR789, Canada, silver, 5678901234, Ford, 2021, Focus, Vancouver
// truck-large, MaxHauler, MHU012, Brazil, green, 6789012345, Scania, 2020, R450, São Paulo
// van-small, CargoMaster, CMR234, France, black, 7890123456, Peugeot, 2022, Partner, Marseille
// van-small, ShadowRider, SHR567, India, orange, 8901234567, Royal Enfield, 2021, Classic 350, Delhi
// van-small, UrbanCruiser, UCR789, South Africa, white, 9012345678, Volkswagen, 2020, Polo Vivo, Johannesburg
// truck-small, TurboTrucker, TTR012, Japan, red, 0123456789, Hino, 2022, Dutro, Tokyo`;

function BulkImportForm() {

  const randomVehicles = [];

  for(let i = 0; i < 100; i++){
    randomVehicles.push(generateRandomVehicleData());
  }

  const testVehiclesCSV = randomVehicles.map(vehicle => {
    return `${vehicle.type}, ${vehicle.name}, ${vehicle.licensePlate}, ${vehicle.country}, ${vehicle.color}, ${vehicle.vin}, ${vehicle.make}, ${vehicle.year}, ${vehicle.model}`
  }).join('\n');

  const formRef  = useRef();

  const { 
    register, 
    handleSubmit, 
    formState: { 
      errors, 
      isSubmitSuccessful 
    }, 
    setError,
    // setValue,
    // clearErrors,
    // getValues
  } = useForm({
    defaultValues: {
      // This field will be set to the first option of the dropdown in useEffect below
      vehiclesData: testVehiclesCSV,
    },
  }); 

  console.log("BulkImportForm; errors -> ", errors);
  console.log("BulkImportForm; isSubmitSuccessful -> ", isSubmitSuccessful);

  const onSubmit = async ({
    vehiclesData,
  }) => {

    console.log("BulkImportForm; onSubmit; Bulk import form submitted!");
    console.log("BulkImportForm; onSubmit; -> ", vehiclesData);

    try {

      const response = await axios.post('http://localhost:5000/api/v1/vehicles/bulkImport', {
        vehiclesData: vehiclesData,
        fleetId: +new URLSearchParams(window.location.search).get("fleetId")
      });

      console.log('response -> ', response);

      // Redirect to '/company-dashboard'
      window.location.href = '/company-dashboard/fleets-management';
      
    } catch (error) {

      console.log("[!] error -> ", error);
      const errorType = error.response.data.errorType;

      if(errorType === "accessToFleetDenied"){
        setError('accessToFleetDenied', {
          message: error.response.data.message,
        });
      }

      else if(errorType === "maxFleetVehiclesReached"){
        setError('maxFleetVehiclesReached', {
          message: error.response.data.message,
        });
      }

      else if(errorType === "nonUniqueLicensePlate"){
        setError('nonUniqueLicensePlate', {
          message: error.response.data.message,
          vehicle: error.response.data.vehicle
        });
      }

      else if(errorType === "nonUniqueVin"){
        setError('nonUniqueVin', {
          message: error.response.data.message,
          vehicle: error.response.data.vehicle
        });
      }

      else if(errorType === "invalidVehicleType"){
        setError('invalidVehicleType', {
          message: error.response.data.message,
          vehicle: error.response.data.vehicle
        });
      }

      else{
        console.error(error);
      }

    }

  };

  return (
    <Box 
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        maxWidth: "750px",
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
        Bulk Import
      </Typography>

      {/* Vehicles data */}
      <FormControl>
        <Label>Vehicles data</Label>
        <TextField
          {...register("vehiclesData", {
            required: "Please enter vehicles data.",
          })}
          placeholder="Paste vehicles data here..."
          multiline
          rows={10}
          sx={{
            '& .MuiInputBase-input': {
              fontFamily: 'monospace',
              fontSize: '12px'
            }
          }}
        />
      </FormControl>
      
      {/* Guidelines */}
      <Box 
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}
      >

        <pre
          style={{
            textWrap: 'wrap',
            backgroundColor: '#f5f5f5',
            border: '1px solid #ccc',
            borderRadius: '5px',
            padding: '10px',
            margin: '0',
          }}
        >
          You can import multiple vehicles as CSV data.<br/>
          {"Data format: {vehicleType}, {name}, {licensePlate}, {country}, {color}, {vin}, {make}, {year}, {model}"}<br/>
          Make sure to separate each field with a comma (,) and avoid extra spaces or special characters.<br/>
          Example:<br/>
          sedan, My Car, ABC123, USA, blue, 1234567890, Honda, 2022, Civic, New York<br/>
          Please follow this format when entering the vehicle information in the input field for bulk import.<br/>
        </pre>

      </Box>

      {/* Error messages */}
      {
        Object.keys(errors).length !== 0 && (
          <Box 
            sx={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {errors.vehiclesData && <ErrorMessage>{errors.vehiclesData.message}</ErrorMessage>}

            {errors.accessToFleetDenied     && <ErrorMessage>{errors.accessToFleetDenied.message}</ErrorMessage>}
            {errors.maxFleetVehiclesReached && <ErrorMessage>{errors.maxFleetVehiclesReached.message}</ErrorMessage>}

            {errors.nonUniqueLicensePlate   && <ErrorMessage>{errors.nonUniqueLicensePlate.message} Vehicle name: {errors.nonUniqueLicensePlate.vehicle.name}</ErrorMessage>}
            {errors.nonUniqueVin            && <ErrorMessage>{errors.nonUniqueVin.message} Vehicle name: {errors.nonUniqueVin.vehicle.name}</ErrorMessage>}
            {errors.invalidVehicleType      && <ErrorMessage>{errors.invalidVehicleType.message} Vehicle name: {errors.invalidVehicleType.vehicle.name}</ErrorMessage>}
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
            Vehicles were successfully imported
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

export default BulkImportForm;