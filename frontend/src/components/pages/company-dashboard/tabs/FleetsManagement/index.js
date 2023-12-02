// React
import React, {useEffect, useState} from 'react';

// Components
import FleetVehiclesTable        from './components/FleetVehiclesTable';
import FleetMainNumbers          from './components/FleetMainNumbers';
import FleetVehiclesDistribution from './components/FleetVehiclesDistribution';

// UI components
import GroupedSelect  from '../../../../ui/GroupedSelect';
import OutlinedButton from '../../../../ui/OutlinedButton';
import PrimaryButton  from '../../../../ui/PrimaryButton';

// MUI components
import {
  Box,
  Typography,
  Breadcrumbs,
  TablePagination
} from '@mui/material';

// Tab-specific components
import VehicleManagementModal from './components/VehicleManagementModal';

// React icons
import {
  MdOutlineAdd,
  MdOutlineFileDownload
} from 'react-icons/md';

// State management
import {useSelector, useDispatch} from "react-redux";
import { 
  setSelectedFleetId,
  setFleetTotalVehicles,
  setVehiclesSkip,
  setVehiclesTake
} from '../../../../../redux-slices/fleet-management';

function getFleetsDropdownOptions(fleets){

  const result = [];

  for(let i = 0; i < fleets.length; i++){

    // Find the city in the result array
    const cityIndex = result.findIndex(city => city.label === fleets[i].city);

    // If the city is not found, add it to the result array
    if(cityIndex === -1){

      result.push({
        label: fleets[i].city,
        options: [
          {
            value: fleets[i].id,
            label: fleets[i].name
          }
        ]
      });

    }
    // If the city is found, add the fleet to the city
    else{
        
      result[cityIndex].options.push({
        value: fleets[i].id,
        label: fleets[i].name
      });

    }

  }

  return result;
  
}

function FleetOverview({text, type='default'}){

  const dispatch = useDispatch();

  const fleets = useSelector(state => state?.companyDashboard?.fleets);
  const selectedFleetId = useSelector((state) => state.fleetManagement.selectedFleetId);
  const fleetsDropdownOptions = getFleetsDropdownOptions(fleets);
  const fleetVehicles = useSelector(state => {
    return state?.companyDashboard?.fleets?.find(fleet => fleet.id === selectedFleetId)?.vehicles;
  });
  const selectedFleetVehiclesCount = useSelector(state => state?.fleetManagement?.selectedFleetVehiclesCount);

  console.log("FleetOverview; fleets -> ", fleets);
  console.log("FleetOverview; selectedFleetId -> ", selectedFleetId);
  console.log("FleetOverview; fleetsDropdownOptions -> ", fleetsDropdownOptions);
  console.log("FleetManagement; fleetVehicles -> ", fleetVehicles);

  const vehiclesSkip = useSelector(state => state.fleetManagement.vehiclesSkip);
  const vehiclesTake = useSelector(state => state.fleetManagement.vehiclesTake);

  console.log("pagination; vehiclesSkip -> ", vehiclesSkip);
  console.log("pagination; vehiclesTake -> ", vehiclesTake);

  const handleChangePage = (
    event,
    newPage,
  ) => {
    dispatch(setVehiclesSkip(newPage * vehiclesTake));
  };

  // TODO: switch to useState; no need to use Redux here
  const handleChangeRowsPerPage = (
    event,
  ) => {
    dispatch(setVehiclesTake(parseInt(event.target.value, 10)));
  };

  // Set default selectedFleetId
  useEffect(() => {
   selectedFleetId === null && fleets?.length > 0 && dispatch(setSelectedFleetId(fleets[0].id));
  }, [fleets, selectedFleetId, dispatch]);

  if(!fleetVehicles){
    return "Loading...";
  }

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
        <Typography 
          color="text.primary"
        >
          Fleets management
        </Typography>
      </Breadcrumbs>

      <Box>

        <Typography
          sx={{
            fontFamily: 'FKGrotesk-Bold',
            fontSize: '24px',
            color: '#363348',
          }}
        >Fleet Management</Typography>

      </Box>

      <Box 
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >

        {/* Fleet selection */}
        <Box
          sx={{
            marginTop: '20px',
            position: 'relative',
            zIndex: 5,
            width: '200px'
          }}
        >
          <GroupedSelect 
            defaultValue={
              fleetsDropdownOptions?.[0]?.options?.[0]
            }
            groupedOptions={fleetsDropdownOptions} 
            onChange={(selectedOption) => {
              dispatch(setSelectedFleetId(selectedOption.value))
            }}
          />
        </Box>

        <Box
          sx={{
            display: 'flex',
            gap: '15px',
          }}
        >
          <OutlinedButton 
            href={'/company-dashboard/new-fleet'}
          >
            <MdOutlineAdd
              fontSize={'18px'}
              color={'#0887F0'}
              style={{
                marginRight: '5px',
              }}
            />
            Create fleet
          </OutlinedButton>
          <OutlinedButton
            href={'/company-dashboard/new-vehicle/?fleetId='+selectedFleetId}
          >
            <MdOutlineAdd
              fontSize={'18px'}
              color={'#0887F0'}
              style={{
                marginRight: '5px',
              }}
            />
            Import vehicle
          </OutlinedButton>
          <PrimaryButton
            href={'/company-dashboard/bulk-import/?fleetId='+selectedFleetId}
          >
            <MdOutlineFileDownload
              fontSize={'18px'}
              color={'#FFF'}
              style={{
                marginRight: '5px',
              }}
            />
            Bulk Import
            <Box 
              sx={{
                position: 'absolute',
                top: '-5px',
                right: '-5px',
                backgroundColor: '#e2f6e9',
                borderRadius: '5px',
                color: 'black !important',
                fontSize: '10px',
                boxShadow: '0px 2.5px 2.5px 0px #00000025',
                padding: '0px 5px',
              }} 
              component="span"
            >
              .CSV
            </Box>
          </PrimaryButton>
        </Box>

      </Box>

      <Box 
        sx={{
          display: 'flex',
          flexDirection: 'row',
          marginTop: '20px',
        }}
      >

        {/* Left side */}
        <Box 
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
            // TODO: fix this
            minWidth: '250px',
            maxWidth: '250px',
          }}
        >
          {/* Main numbers */}
          <FleetMainNumbers/>
          <FleetVehiclesDistribution/>
        </Box>

        {/* Fleet cars table */}
        <Box
          sx={{
            width: '100%',
            borderRadius: '4px',
            padding: '15px',
            border: '1px #b3b2ba solid',
            boxShadow: '0px 2.5px 2.5px 0px #b3b2ba50',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          {/* Fleet vehicles table */}
          <FleetVehiclesTable
            rows={fleetVehicles}
          />

          {/* TablePagination */}
          <TablePagination
            component="div"
            count={selectedFleetVehiclesCount}
            page={vehiclesSkip / vehiclesTake}
            onPageChange={handleChangePage}
            rowsPerPage={vehiclesTake}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>

      </Box>

    </Box>

  );

}

export default FleetOverview;