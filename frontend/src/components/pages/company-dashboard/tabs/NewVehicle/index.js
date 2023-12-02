// React
import React from 'react';

// MUI components
import { 
  Box, 
  Link, 
  Breadcrumbs,
  Typography
} from '@mui/material';

// Components
import NewVehicleForm from './components/NewVehicleForm';

function NewVehicle(){

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
          color="inherit" href="/company-dashboard/fleets-management"
        >
          Fleets Management
        </Link>
        <Typography 
          color="text.primary"
        >
          Import Vehicle
        </Typography>
      </Breadcrumbs>

      <NewVehicleForm/>
      
    </Box>
  );

}

export default NewVehicle;