// React
import React, {useState, useEffect} from 'react';

// Layout
import Header  from './layout/Header';
import SideBar from './layout/SideBar';

// React Router
import {
  Outlet
} from "react-router-dom";

// MUI components
import { Box } from '@mui/material';

// axios
import axios from 'axios';

// Redux
import {useSelector, useDispatch} from "react-redux";
import {
  setCompanyInfo,
  setFleetManagerInfo,
  setFleetsInfo,
  setVehiclesCategories
} from '../../../redux-slices/company-dashboard';

import {
  setSelectedFleetId,
  setSelectedFleetVehiclesCount,
  setVehiclesDistribution,
} from '../../../redux-slices/fleet-management';

function CompanyDashboard() {

  const dispatch = useDispatch();

  const selectedFleetId            = useSelector(state => state.fleetManagement.selectedFleetId);
  // const selectedFleetVehiclesCount = useSelector(state => state.fleetManagement.selectedFleetVehiclesCount);
  // const companyInfo                = useSelector(state => state?.companyDashboard?.companyInfo);
  const fleets                     = useSelector(state => state?.companyDashboard?.fleets);
  // const fleetManagerInfo           = useSelector(state => state?.companyDashboard?.fleetManagerInfo);

  // console.log("CompanyDashboard; companyInfo -> ", companyInfo);
  console.log("CompanyDashboard; fleets -> ", fleets);
  // console.log("CompanyDashboard; fleetManagerInfo -> ", fleetManagerInfo);
  // console.log("CompanyDashboard; axious.defaults -> ", axios.defaults);

  // Pagination
  const vehiclesSkip = useSelector(state => state.fleetManagement.vehiclesSkip);
  const vehiclesTake = useSelector(state => state.fleetManagement.vehiclesTake);

  // Fetch data and hydrate the redux store
  useEffect(() => {

    const fetchData = async () => {

      try{

        // Fetch fleet manager info
        const res = await axios.get(`http://localhost:5000/api/v1/users/fleetManagerInfo?vehiclesSkip=${vehiclesSkip}&vehiclesTake=${vehiclesTake}`);

        // Set compnay info
        dispatch(setCompanyInfo({
          name: res.data.company.name,
          address: res.data.company.address,
          phone: res.data.company.phone,
          email: res.data.company.email,
          city: res.data.company.city,
          country: res.data.company.country,
          website: res.data.company.website,
          createdAt: res.data.company.createdAt,
          updatedAt: res.data.company.updatedAt,
        }));

        // Set fleet manager info
        dispatch(setFleetManagerInfo({
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          email: res.data.email,
          phone: res.data.phone,
          createdAt: res.data.createdAt,
          updatedAt: res.data.updatedAt,
        }));

        // Set fleets
        dispatch(setFleetsInfo(res.data.company.fleets));

        // Set selected fleet id
        dispatch(setSelectedFleetId(res.data.company.fleets[0].id));
        
      }
      catch(err){
        console.error("/users/fleetManagerInfo; err -> ", err);
      }

    }

    fetchData();

  }, [dispatch, vehiclesSkip, vehiclesTake]);

  // Fetch vehicles categories
  useEffect(() => {
    const fetchVehicleCategories = async () => {
      try {
        // Fetch vehicle categories
        const res = await axios.get('http://localhost:5000/api/v1/vehicles/vehiclesCategories');
  
        // Set vehicle categories
        dispatch(setVehiclesCategories(res.data));
      } catch (err) {
        console.error("/vehicles/vehiclesCategories; err -> ", err);
      }
    };
  
    fetchVehicleCategories();
  }, [dispatch]);

  // Fetch selected fleet vehicles count
  useEffect(() => {

    if(!selectedFleetId) return;

    const fetchData = async () => {

      try{

        const res = await axios.get('http://localhost:5000/api/v1/vehicles/fleetVehiclesCount?fleetId=' + selectedFleetId);
        dispatch(setSelectedFleetVehiclesCount(res.data));

      }
      catch(err){
        console.error("/vehicles/fleetVehiclesCount?; err -> ", err);
      }

    }

    fetchData();

  }, [selectedFleetId, dispatch]);

  // Fetch vehicles distribution
  useEffect(() => {

    if(!selectedFleetId) return;
    
    const fetchData = async () => {

      try{

        const res = await axios.get('http://localhost:5000/api/v1/vehicles/fleetVehiclesDistribution?fleetId=' + selectedFleetId);

        console.log("/vehicles/fleetVehiclesDistribution; res.data -> ", res.data)

        dispatch(setVehiclesDistribution(res.data));

      }
      catch(err){
        console.error("/vehicles/fleetVehiclesDistribution; err -> ", err);
      }
      
    }
    
    fetchData();

  }, [selectedFleetId, dispatch]);

  // Brevo
  // TODO: setup different Brevo account for B2B (now B2C account is used)
  useEffect(() => {
    (function(d, w, c) {
      w.BrevoConversationsID = '6481995601df60628d7e5137';
      w[c] = w[c] || function() {
          (w[c].q = w[c].q || []).push(arguments);
      };
      var s = d.createElement('script');
      s.async = true;
      s.src = 'https://conversations-widget.brevo.com/brevo-conversations.js';
      if (d.head) d.head.appendChild(s);
  })(document, window, 'BrevoConversations');
  }, []);

  return (
    <>
      {/* Header */}
      <Header />

      {/* Dashboard contents wrapper */}
      <Box
        sx={{
          width: '100%',
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
        }}
      >
        
        {/* Side bar */}
        <SideBar/>

        {/* Tabs wrapper */}
        <Box
          sx={{
            padding: '40px',
            paddingRight: '0',
            width: '100%',
          }}
        >
          <Outlet />
        </Box>

      </Box>

    </>
  );
  
}

export default CompanyDashboard;