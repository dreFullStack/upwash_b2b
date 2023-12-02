// React
import React from 'react';

// MUI components
import {
  Box,
  Typography
} from '@mui/material';

function VehicleInformationCard({
  title,
  value
}){

  return (

    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        padding: '5px 10px',
        borderRadius: '5px',
        border: '1px #b3b2ba solid',
        boxShadow: '0px 2.5px 2.5px 0px #b3b2ba50'
      }}
    >

      {/* Title */}
      <Typography
        sx={{
          fontSize: '14px',
          color: '#363348',
          marginBottom: '5px',
          fontWeight: 'bold',
        }}
      >
        {title}
      </Typography>

      {/* Value */}
      <Typography
        sx={{
          fontSize: '12px',
          color: '#363348',
        }}
      >
        {value}
      </Typography>

    </Box>

  );

}

export default VehicleInformationCard;