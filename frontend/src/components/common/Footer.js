import React from 'react';
import {
  Box,
  Typography,
} from '@mui/material';

const Footer = () => {
  return (
    <Box 
      sx={{
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: "rgba(0, 0, 0, 0.75)",
        paddingBlock: '100px',
      }}
    >
      
      {/* Inner wrapper */}
      <Box sx={{
        width: '100%',
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'flex',
        gap: '50px',
        justifyContent: 'space-between',
      }}>

        <Box 
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '25px',
          }}
        >

          <Typography
            sx={{
              fontFamily: 'FKGrotesk-Regular',
              color: '#FFF',
              fontSize: '14px',
              lineHeight: '16px',
            }}
          >
            © 2023 upwash. All rights reserved.
          </Typography>

          <Typography
            sx={{
              fontFamily: 'FKGrotesk-Regular',
              color: '#FFF',
              fontSize: '14px',
              lineHeight: '16px',
            }}
          >
            Helsinki, Finland
          </Typography>

        </Box>

        <Box 
          sx={{
            width: '200px',
          }}
        >
          <img 
            src="/images/scalar_dynamics_logo.png" 
            alt="Scalar Dynamics logo" 
            style={{
              width: '200px',
            }}
          />
        </Box>

      </Box>
    </Box>
  );
};

export default Footer;