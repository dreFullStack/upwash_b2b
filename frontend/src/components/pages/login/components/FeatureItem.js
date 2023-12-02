// React
import React, {cloneElement} from 'react';

// MUI components
import {
  Box,
  Typography,
} from '@mui/material';

function FeatureItem({ icon, title, description }) {

  return (
    <Box
      sx={{
        display: 'flex',
        gap: '25px',
        alignItems: 'center',
      }}
    >

      <Box
        sx={{
          // width: '75px',
          height: '75px',

          // NOTE: width for flex item 
          // flexBasis: '200px',
          // flexGrow: 0,
          // flexShrink: 0,

          // Or shorthand:
          flex: '0 0 75px',

          borderRadius: '5px',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {
          cloneElement(icon, {
            fontSize: "36px",
            color: "#fff",
          })
        }          
      </Box>

      <Box 
        sx={{

        }}
      >

        <Typography
          sx={{
            fontFamily: 'FKGrotesk-Bold',
            fontSize: '16px',
            color: '#fff',
          }}
        >
          {title}
        </Typography>

        <Typography
          sx={{
            fontFamily: 'FKGrotesk-Regular',
            fontSize: '14px',
            color: '#fff',
            textAlign: 'justify',
          }}
        >
          {description}
        </Typography>

      </Box>

    </Box>

  );

} 

export default FeatureItem;