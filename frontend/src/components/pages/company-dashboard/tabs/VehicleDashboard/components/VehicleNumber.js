// React
import React, {cloneElement} from 'react';

// React icons
import {
  BsArrowDownShort, 
  BsArrowUpShort
} from 'react-icons/bs';

// MUI components
import { 
  Box, 
  Typography
} from '@mui/material';

function VehicleNumber({
  title,
  number,
  percentageNumber,
  percentageNegatve=false,
  icon
}){

  return(
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        border: '1px #b3b2ba solid',
        boxShadow: '0px 2.5px 2.5px 0px #b3b2ba50',
        borderRadius: '5px',
        padding: '10px',
        width: '100%',
      }}
    > 

      {/* Title and percentage */}
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
      }}>

        {/* Title */}
        <Typography
          sx={{
            fontSize: '12px',
            color: '#363348',
            marginRight: '10px',
          }}
        >
          {title}
        </Typography>

        {/* Percentage */}
        {
          percentageNumber && (
            <Typography
              sx={{
                fontWeight: 'bold',
                fontSize: '12px',
                color: percentageNegatve ? '#f54d3b' : '#77b50a',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {percentageNumber}%

              {/* Arrow */}
              {
                percentageNegatve ? (
                  <BsArrowDownShort
                    color="#f54d3b"
                  />
                ) : (
                  <BsArrowUpShort
                    color="#77b50a"
                  />  
                )
              }

            </Typography>
          )
        }

        {/* Icon */}
        {
          icon && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#e2f6e9',
                width: '25px',
                height: '25px',
                borderRadius: '5px',
                boxShadow: '0px 2.5px 2.5px 0px #b3b2ba50',
                border: '1px #b3b2ba solid',
              }}
            >
              {cloneElement(icon, {
                fontSize: '15px',
                color: '#4ea194'
              })}
            </Box>
          )
        }

      </Box>

      {/* Big number */}
      <Typography
        sx={{
          // fontFamily: 'FKGrotesk-Bold',
          fontWeight: 'bold',
          fontSize: '14px',
          marginTop: '2.5px',
        }}
      >
        {number}
      </Typography>

    </Box>
  );

}

export default VehicleNumber;