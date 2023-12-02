// React
import React, {cloneElement} from 'react';

// MUI components
import {
  Box,
  Typography
} from '@mui/material';

function ServiceCard({
  title,
  price,
  duration,
  icon,
  ...rest
}){

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        backgroundColor: '#FFF',
        boxShadow: '0px 2.5px 2.5px 0px #b3b2ba50',
        borderRadius: '5px',
        padding: '10px',
        border: '1px #b3b2ba solid',
        ...rest?.sx
      }}
      {...rest}
    >
      {/* Title and icon */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        {/* Title */}
        <Typography
          sx={{
            fontFamily: 'FKGrotesk-Bold',
            fontSize: '14px',          
          }}
        >
          {title}
        </Typography>

        {/* Icon */}
        {
          cloneElement(icon, {
            color: '#000',
            size: '25px',
          })
        }
      </Box>

      {/* Price and duration */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        {/* Price */}
        <Typography
          sx={{
            fontFamily: 'FKGrotesk-Regular',
            fontSize: '12px',
            color: '#333040'
          }}
        >
          {price}
        </Typography>

        {/* Duration */}
        <Typography
          sx={{
            fontFamily: 'FKGrotesk-Regular',
            fontSize: '12px',
            color: '#333040'
          }}
        >
          {duration}
        </Typography>

      </Box>
        

    </Box>
  );

}

export default ServiceCard;