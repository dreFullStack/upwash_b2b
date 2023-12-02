// React
import React, {useState, useEffect} from 'react';

// MUI components
import { 
  Box, 
  Typography,
  Alert,
  CircularProgress,
  FormControl
} from '@mui/material';

// State management
import {useSelector} from "react-redux";

// Axios
import axios from 'axios';

// utils
import restructureVehicleServices from "../utils/restructureVehicleServices";
import minutesToString            from '../utils/minutesToString';
import calculatePrice             from '../utils/calculatePrice';

// Components
import SerciceItem from "./ServiceItem";
import ServiceIcon from "./ServiceIcon";
import VehiclesAttach from "./VehiclesAttach";

// UI components
import PrimaryButton from '../../../../../ui/PrimaryButton';
import Label         from '../../../../../ui/institutional/Label';
import Input         from '../../../../../ui/institutional/Input';
import Textarea      from '../../../../../ui/Textarea';
import TimeSelection from './TimeSelection';

function NewOrderForm(){
  
  const vehicleServices = useSelector(state => state.newOrder.vehicleServices);
  const restructuredVehicleServices = restructureVehicleServices(vehicleServices);

  // Local state management
  const [selectedService, setSelectedService] = useState(null);
  const [availableTimes, setAvailableTimes]   = useState(null);
  const [availableTimesLoading, setAvailableTimesLoading] = useState(false);
  const [vehiclesOfSameType, setVehiclesOfSameType] = useState(null);
  const [attachedVehicles, setAttachedVehicles] = useState([]); // [{name: 'Truck', licensePlate: 'ABC-123'}

  const [contactPersonName, setContactPersonName] = useState('');
  const [contactPersonPhone, setContactPersonPhone] = useState('');
  const [location, setLocation] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  // Reset selectedDate and selectedTime when selectedService changes
  useEffect(() => {
    setSelectedDate('');
    setSelectedTime('');
  }, [selectedService]);

  console.log("NewOrderForm; vehicleServices -> ", vehicleServices);
  console.log("NewOrderForm; restructuredVehicleServices -> ", restructuredVehicleServices);
  console.log("NewOrderForm; availableTimes -> ", availableTimes);
  console.log("NewOrderForm; vehiclesOfSameType -> ", vehiclesOfSameType);

  // Fetch available times
  useEffect(() => {

    if(!selectedService){
      return;
    }

    const fetchAvailableTimes = async () => {

      setAvailableTimesLoading(true);

      console.log('fetchAvailableTimes');

      const duration = selectedService.duration * (attachedVehicles.length ? attachedVehicles.length+1 : 1);

      const apiUrl = `http://localhost:5000/api/v1/scheduling/availableTimes?duration=${duration}`;
     
      const response = await axios.get(apiUrl);

      setAvailableTimesLoading(false);
      // console.log('fetchAvailableTimes; Response:', response.data);

      setAvailableTimes(response.data);

    }

    fetchAvailableTimes();

  }, [selectedService, attachedVehicles]);

  // Fetch vehicles of same type
  useEffect(() => {

    const fetchVehiclesOfSameType = async () => {

      const vehicleId = +new URLSearchParams(window.location.search).get("vehicleId");

      const response = await axios.get(`http://localhost:5000/api/v1/vehicles/fleetVehiclesOfSameType?vehicleId=${vehicleId}`);

      console.log('fetchVehiclesOfSameType; Response:', response.data);

      setVehiclesOfSameType(response.data);

    }

    fetchVehiclesOfSameType();

  }, []);

  const handleSubmit = async () => {

    if(!selectedService){
      alert('Please select a service');
      return false;
    }

    if(!selectedDate){
      alert('Please select a date');
      return false;
    }

    if(!selectedTime){
      alert('Please select a time');
      return false;
    }

    if(!contactPersonName){
      alert('Please enter a contact person name');
      return false;
    }

    if(!contactPersonPhone){
      alert('Please enter a contact person phone');
      return false;
    }

    if(!location){
      alert('Please enter a location');
      return false;
    }

    const vehicleId = +new URLSearchParams(window.location.search).get("vehicleId");

    // const vehicleIds = [...vehiclesOfSameType.map(vehicle => vehicle.id), vehicleId];
    const vehicleIds = [...attachedVehicles.map(vehicle => vehicle.id), vehicleId];

    const payload = {
      selectedService,
      selectedDate,
      selectedTime,
      vehicleIds,
      contactPersonName,
      contactPersonPhone,
      location,
      additionalInfo
    };

    const apiUrl = `http://localhost:5000/api/v1/order/newOrder`;

    const response = await axios.post(apiUrl, payload);

    console.log('handleSubmit; Response:', response.data);

    // Redirect to company-dashboard/fleets-management
    window.location.href = '/company-dashboard/fleets-management';

  }

  if(!vehicleServices){
    return "Loading...";
  };

  return (
    <Box
      sx={{
        padding: '15px',
        border: '1px #b3b2ba solid',
        borderRadius: '5px',
        boxShadow: '0px 2.5px 2.5px 0px #b3b2ba50',
        maxWidth: '800px',
      }}
    >

      {/* Step 1: Service selection */}
      <Typography
        sx={{
          fontFamily: 'FKGrotesk-Bold',
          fontSize: '16px'
        }}
      >
        Step 1: Service selection
      </Typography>

      {/* Services */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
        }}
      >

        {restructuredVehicleServices.map((serviceCategory, index) => (
          <Box
            key={serviceCategory.categoryCode}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              marginTop: '15px'
            }}
          >

            {/* Category title */}
            <Typography
              sx={{
                fontFamily: 'FKGrotesk-Bold',
                fontSize: '16px',
                marginTop: '10px'
              }}
            >
              {serviceCategory.categoryName}
            </Typography>

            {/* Services */}
            <Box
              sx={{
                marginTop: '10px',
                display: 'grid',
                gridTemplateColumns: '300px 300px',
                gridGap: '10px',
              }}
            >
              {
                serviceCategory.services.map((service, index) => {
                  return (
                    <SerciceItem
                      key={service?.code}
                      title={service.name}
                      description={service.description}
                      price={service.price + " EUR"}
                      duration={minutesToString(service.duration)}
                      icon={<ServiceIcon serviceCode={service?.code} />}
                      isSelected={selectedService?.code === service?.code}
                      onClick={() => {
                        setSelectedService(service);
                      }}
                    />
                  );
                })
              }
            </Box>

          </Box>

        ))}

      </Box>
      {/* Step 2: attach vehicles to the order */}
      <Typography
        sx={{
          fontFamily: 'FKGrotesk-Bold',
          fontSize: '16px',
          marginTop: '25px'
        }}
      >
        Step 2: Attach vehicles to the order
      </Typography>

      <Typography
        sx={{
          fontFamily: 'FKGrotesk-Regular',
          fontSize: '14px',
          marginTop: '10px',
          padding: '10px',
          border: '1px #b3b2ba solid',
          borderRadius: '5px',
          backgroundColor: '#f5f5f5',
          boxShadow: '0px 2.5px 2.5px 0px #b3b2ba50',
        }}
      >
        You can attach vehicles of the same type to the order if you want to perform the service on multiple vehicles at the same time.<br/>
        NOTE: The service duration will be multiplied by the number of attached vehicles.<br/>
        NOTE: All attached vehicles must be at the same location as the selected vehicle.
      </Typography>

      {
        vehiclesOfSameType === null ?
        (
          <Alert
            severity="info"
            sx={{
              marginTop: '15px'
            }}
          >
            Loading vehicles...
          </Alert>
        ) :
        vehiclesOfSameType.length === 0 ?
        (
          <Alert
            severity="info"
            sx={{
              marginTop: '15px'
            }}
          >
            No vehicles of the same type found
          </Alert>
        ) :
        (
          <Box
            sx={{
              marginTop: '15px',
              display: 'grid',
              gridTemplateColumns: '300px 300px',
              gridGap: '10px',
            }}
          >
            <VehiclesAttach
              vehicles={vehiclesOfSameType}
              onChange={(vehicles) => {
                setAttachedVehicles(vehicles);
              }}
            />
          </Box>
        )

      }
      {/* Step 3: Contact person details */}
      <Typography
        sx={{
          fontFamily: 'FKGrotesk-Bold',
          fontSize: '16px',
          marginTop: '25px'
        }}
      >
        Step 3: Contact person details
      </Typography>

      <Box 
        sx={{
          marginTop: '15px',
          display: 'flex',
          gap: '15px',
        }}
      >
        {/* Contact person name */}
        <FormControl>
          <Label>
            Contact person name
          </Label>
          <Input
            value={contactPersonName}
            size="small"
            onChange={(e) => {
              setContactPersonName(e.target.value);
            }}
          />
        </FormControl>

        {/* Contact person phone */}
        <FormControl>
          <Label>
            Contact person phone
          </Label>
          <Input
            value={contactPersonPhone}
            size="small"
            onChange={(e) => {
              setContactPersonPhone(e.target.value);
            }}
          />
        </FormControl>
      </Box>

      {/* Step 4: Location and additional information */}
      <Typography
        sx={{
          fontFamily: 'FKGrotesk-Bold',
          fontSize: '16px',
          marginTop: '25px'
        }}
      >
        Step 4: Location and additional information
      </Typography>
     
      {/* Location */}
      <FormControl
        sx={{
          marginTop: '15px',
          display: 'block',
        }}
      >
        <Label>
          Location
        </Label>
        <Input
          value={location}
          size="small"
          onChange={(e) => {
            setLocation(e.target.value);
          }}
        />
      </FormControl>

      {/* Additional information */}
      <FormControl
        sx={{
          marginTop: '15px',
          display: 'block',
        }}
      >
        <Label>
          Additional information
        </Label>
        <Textarea
          value={additionalInfo}
          size="small"
          onChange={(e) => {
            setAdditionalInfo(e.target.value);
          }}
        />
      </FormControl>

      {/* Step 5: date and time selection */}
      <Typography
        sx={{
          fontFamily: 'FKGrotesk-Bold',
          fontSize: '16px',
          marginTop: '25px'
        }}
      >
        Step 5: Date and time selection
      </Typography>

      {/* Time selection */}
      {
        availableTimesLoading ?
        (
          <Box
            sx={{
              marginTop: '15px',
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <CircularProgress />
          </Box>
        ) : 
        availableTimes ? 
        (
          <TimeSelection
            availableTimes={availableTimes}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            setSelectedDate={setSelectedDate}
            setSelectedTime={setSelectedTime}
            sx={{
              marginTop: '15px'
            }}
          />
        ) : (
          <Alert 
            severity="info"
            sx={{
              marginTop: '10px'
            }}
          >
            Please select a service to see available times
          </Alert>
        )
      }

      {/* Order information */}
      <Box  
        sx={{
          marginTop: '25px',
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
          padding: '15px',
          border: '1px #b3b2ba solid',
          boxShadow: '0px 2.5px 2.5px 0px #b3b2ba50',
          borderRadius: '5px',
        }}
      >

        {/* Title */}
        <Typography
          sx={{
            fontFamily: 'FKGrotesk-Bold',
            fontSize: '16px'
          }}
        >
          Order information
        </Typography>

        {/* Selected service */}
        <Typography
          sx={{
            fontFamily: 'FKGrotesk-Regular',
            fontSize: '14px'
          }}
        >
          Selected service: <b>{selectedService ? selectedService.name : "No service selected"}</b>
        </Typography>

        {/* Selected date */}
        <Typography
          sx={{
            fontFamily: 'FKGrotesk-Regular',
            fontSize: '14px'
          }}
        >
          Selected date: <b>{selectedDate ? selectedDate : "No date selected"}</b>
        </Typography>

        {/* Selected time */}
        <Typography
          sx={{
            fontFamily: 'FKGrotesk-Regular',
            fontSize: '14px'
          }}
        >
          Selected time: <b>{selectedTime ? selectedTime : "No time selected"}</b>
        </Typography>

        {/* Attached vehicles */}
        <Typography
          sx={{
            fontFamily: 'FKGrotesk-Regular',
            fontSize: '14px'
          }}
        >
          Total vehicles number: <b>{attachedVehicles.length ? attachedVehicles.length+1 : 1}</b>
        </Typography>

        {/* Estimated duration */}
        <Typography
          sx={{
            fontFamily: 'FKGrotesk-Regular',
            fontSize: '14px'
          }}
        >
          Estimated duration: <b>{
            selectedService ? 
              minutesToString(
                selectedService.duration * (attachedVehicles.length ? attachedVehicles.length+1 : 1)
              ) : 
              'No service selected'
          }</b>
        </Typography>

        {/* Estimated price */}
        <Typography
          sx={{
            fontFamily: 'FKGrotesk-Regular',
            fontSize: '14px'
          }}
        >
          Estimated price: <b>{
            selectedService ? 
              // TODO: make this a separate function
              (Math.round(
                calculatePrice(
                  selectedService, attachedVehicles
                )  
              * 100) / 100).toFixed(2) + " EUR"
               : 
              'No service selected'
          }</b>
        </Typography>

      </Box>

      {/* Submit button */}
      <PrimaryButton  
        sx={{
          marginTop: '15px'
        }}
        onClick={handleSubmit}
      >
        Complete order
      </PrimaryButton>

    </Box>
  );

}

export default NewOrderForm;