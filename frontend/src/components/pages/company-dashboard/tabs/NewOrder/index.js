// React
import React, {useState, useEffect} from 'react';

// MUI components
import { 
  Box, 
  Link, 
  Breadcrumbs,
  Typography
} from '@mui/material';

// State management
import {useSelector, useDispatch} from "react-redux";
import {
  setVehicleInfo,
  setVehicleServices
} from "../../../../../redux-slices/new-order";

// Axios
import axios from 'axios';

// Components
import NewOrderForm from "./components/NewOrderForm";

function NewOrder(){

  const dispatch = useDispatch();

  const vehicleInfo = useSelector(state => state.newOrder.vehicleInfo);
  
  console.log("NewOrder; vehicleInfo -> ", vehicleInfo);

  // Fetch vehicle information
  useEffect(() => {
    const fetchVehicleInformation = async () => {
      const vehicleId = +new URLSearchParams(window.location.search).get("vehicleId");
      const vehicleInformation = await axios.get(`http://localhost:3005/api/v1/vehicles/vehicleInfo?vehicleId=${vehicleId}`);
      dispatch(setVehicleInfo(vehicleInformation.data));
    };

    fetchVehicleInformation();
  }, [dispatch]);

  // Fetch vehicle services
  useEffect(() => {

    const fetchVehicleServices = async () => {
      const vehicleId = +new URLSearchParams(window.location.search).get("vehicleId");
      const vehicleServices = await axios.get(`http://localhost:3005/api/v1/vehicles/vehicleServices?vehicleId=${vehicleId}`);
      dispatch(setVehicleServices(vehicleServices.data));
    };

    fetchVehicleServices();

  }, [dispatch]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
    
      {/* Breadcrumbs */}
      <Breadcrumbs 
        aria-label="breadcrumb"
        sx={{
          marginBottom: '25px',
        }}
      >
        <Typography 
          color="text.primary"
        >
          Company Dashboard
        </Typography>
        <Link 
          underline="hover"
          color="inherit" 
          href="/company-dashboard/fleets-management"
        >
          Fleets Management
        </Link>
        <Typography 
          color="text.primary"
        >
          New order
        </Typography>
      </Breadcrumbs>

      {/* New order */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '25px'
        }}
      >

        <Box 
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >

          {/* Title */}
          <Typography
            sx={{
              fontFamily: 'FKGrotesk-Bold',
              fontSize: '24px',
              color: '#000',
            }}
          >
            New order
          </Typography>

          {/* Vehicle name */}
          <Typography
            sx={{
              fontFamily: 'FKGrotesk-Regular',
              fontSize: '16px',
              color: '#000',
            }}
          >
            <b>Vehicle name</b>: {vehicleInfo?.name || "N/A"}
          </Typography>

          {/* Vehicle type */}
          <Typography
            sx={{
              fontFamily: 'FKGrotesk-Regular',
              fontSize: '16px',
              color: '#000',
            }}
          >
            <b>Vehicle type</b>: {vehicleInfo?.vehicleType?.code || "N/A"}
          </Typography>

        </Box>

        {/* New order form */}
        <NewOrderForm />

      </Box>

    </Box>
  );

}

export default NewOrder;