// React
import React from 'react';

// MUI components
import {
  Box
} from '@mui/material';

function getStyles(status){

  if(status === 'upcoming'){
    return {
      backgroundColor: '#fff0e5',
      color: '#ca9f75',
      borderRadius: '4px',
      width: 'fit-content',
      padding: '2.5px 10px',
    };
  }
  else{
    return {
      backgroundColor: '#e6f6f5',
      color: '#6b9d9f',
      borderRadius: '4px',
      width: 'fit-content',
      padding: '2.5px 10px',
    };
  }

}

function getText(status){

  if(status === 'completed'){
    return 'Completed';
  }
  else if(status === 'upcoming'){
    return 'Upcoming';
  }
  // TODO: throw error if status is not valid
  else{
    return 'Error'
  }

}

function ServiceStatus({status}){

  return (
    <Box
      sx={getStyles(status)}
    >
      {getText(status)}
    </Box>
  );

}

export default ServiceStatus;