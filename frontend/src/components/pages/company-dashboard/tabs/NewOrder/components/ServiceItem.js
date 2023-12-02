import React, {cloneElement} from 'react';

// MUI components
import {
  Box,
  Typography,
  Checkbox
} from '@mui/material';

// React icons
import {
  MdAccessTime
} from 'react-icons/md';

function ServiceItem(
  {
    title,
    description,
    price,
    icon,
    duration,
    isSelected,
    ...rest
  }
){

  return (
    <Box 
      {...rest}
      sx={{
        display: 'inline-flex',
        flexDirection: 'column',
        padding: '10px',
        border:
          isSelected ? 
            '1px #0887F0 solid' : 
            '1px #b3b2ba solid',
        borderRadius: '5px',
        boxShadow:
          isSelected ?
            '0 0 0 2.5px #0887F050' : 
            '0px 2.5px 2.5px 0px #b3b2ba50',
        cursor: 'pointer',
        backgroundColor: '#FFF',
        position: 'relative',
        ...rest?.sx,
      }}
    >

      {/* Icon */}
      <Box 
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          top: '5px',
          right: '5px',
          backgroundColor: '#FFF',
          border: '1px #b3b2ba solid',
          width: '20px',
          height: '20px',
          borderRadius: '5px',
          boxShadow: '0px 2.5px 2.5px 0px #b3b2ba50'
        }}
      >
        {cloneElement(icon, {
          color: '#000',
          size: '15px'
        })}
      </Box>

      <Box 
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        {/* Checkbox */}
        <Checkbox
          size="small"
          sx={{
            color: '#0887F0',
            // alignSelf: 'flex-start',
            marginRight: '-5px',
            '&.Mui-checked': {
              color: '#0887F0',
            },
          }}
          checked={isSelected}
        />

        {/* Title and description */}
        <Box 
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
          }}
        >
          <Typography
            sx={{
              fontFamily: 'FKGrotesk-Bold',
              fontSize: '14px',
            }}
          >
            {title}
          </Typography>
          {/* <Typography
            sx={{
              fontFamily: 'FKGrotesk-Regular',
              fontSize: '12px',
            }}
          >
            {description}
          </Typography> */}
        </Box>
      </Box>

      {/* Price and duration */}
      <Box
        sx={{
          display: 'flex',
          gap: '10px',
          alignItems: 'center',
          marginBottom: '5px',
          marginTop: '10px',
          marginLeft: '10px',
        }}
      >
        {/* Price */}
        <Typography
          sx={{
            fontFamily: 'FKGrotesk-Bold',
            fontSize: '12px',
            backgroundColor: '#e2f6e9',
            color: '#000',
            padding: '2.5px 5px',
            width: 'fit-content',
            borderRadius: '3px',
            boxShadow: '0px 2.5px 2.5px 0px #b3b2ba50',
            border: '1px #b3b2ba solid',
          }}
        >
          {price}
        </Typography>
        {/* Duration */}
        <Box 
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            padding: '2.5px 5px',
            borderRadius: '3px',
            boxShadow: '0px 2.5px 2.5px 0px #b3b2ba50',
            border: '1px #b3b2ba solid',
          }}
        >
          <MdAccessTime
            size="15px"
            color="#000"
          />  
          <Typography
            sx={{
              fontFamily: 'FKGrotesk-Bold',
              fontSize: '12px',
            }}
          > 
            {duration}
          </Typography>
        </Box>
      </Box>
      
    </Box>
  );

}

export default ServiceItem;