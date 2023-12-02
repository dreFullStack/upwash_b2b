// React
import React from "react";

// MUI components
import {
  Box,
  Typography
} from "@mui/material";

// TODO: consider license plates of other countries
function LicensePlate({children}){

  return (
      <Box 
        sx={{
          border: '1px #000 solid',
          borderRadius: '3px',
          display: 'flex',
          width: "68px",
          boxShadow: '0px 2.5px 2.5px 0px #b3b2ba50',
        }}
      >
        <Box
          sx={{
            width: "8px",
            backgroundImage: 'url(/images/finnish_license_plate_flag.jpg)',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            marginRight: '5px',
          }}
        >
          
        </Box>
        <Box
          sx={{

          }}
        >
          <Typography
            sx={{
              fontWeight: 'bold',
              fontSize: '12px',
              fontFamily: 'monospace'
            }}
          >
            {children}
          </Typography>
        </Box>
      </Box>
  );

}

export default LicensePlate;