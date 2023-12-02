// React
import React from 'react';

// MUI components
import { 
  Box,
  Breadcrumbs,
  Typography
} from '@mui/material';

// Components
import FleetManagerMainInfo from './components/FleetManagerMainInfo';
import CompanyInfo from './components/CompanyInfo';

function Overview(){

  return (
    <Box 
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
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
          Profile
        </Typography>
      </Breadcrumbs>

      <FleetManagerMainInfo/>
      <CompanyInfo/>

    </Box>
  );

}

export default Overview;