// React
import React from 'react';

// MUI components
import { 
  Box,
  Typography,
  Breadcrumbs
} from '@mui/material';

function Overview(){

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
          Overview
        </Typography>
      </Breadcrumbs>
    </Box>
  );

}

export default Overview;