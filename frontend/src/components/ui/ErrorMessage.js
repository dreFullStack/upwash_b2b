// React
import React from 'react';

// MUI components
import {
  Typography
} from '@mui/material';

function ErrorMessage({schildren, ...rest}){

  return (
    <Typography 
      sx={{
        color: 'red',
        fontFamily: 'FKGrotesk-Regular',
        fontSize: '16px',
      }}
      {...rest}
    />
  );

}

export default ErrorMessage;