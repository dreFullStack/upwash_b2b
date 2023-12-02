// React
import React, {cloneElement} from 'react';

// MUI components
import {
  Box, 
  Typography
} from '@mui/material';

function Tab({
  icon, 
  children, 
  disabled=false,
  isActive=false,
  count,
  ...rest
}){

  return (

    <Box 
      sx={{
        cursor: disabled ? 'default' : 'pointer',
        borderRadius: '4px',
        padding: '6px',
        position: 'relative',
        backgroundColor: isActive ? '#eeedef' : '',
        opacity: disabled ? '0.5' : '1',
      }}
      {...rest}
    >

      <Typography 
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontSize: '14px',
          color: "#333040",
        }}
      >

        {/* Icon wrapper */}
        <Box 
          sx={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#FFF',
            borderRadius: '5px',
            padding: '4px',
            border: '1px #b3b2ba solid',
            boxShadow: '0px 2.5px 2.5px 0px #b3b2ba50'
          }}
          component="span"
        >
          {cloneElement(icon, {
            size: '16px',
            color: '#000'
          })}
        </Box>

        {children}

        {count && (
          <Box
            component="span"
            sx={{
              backgroundColor: '#363348',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '18px',
              height: '18px',
              borderRadius: '5px',
              fontSize: '12px',
              marginLeft: 'auto',
              boxShadow: '0px 2.5px 2.5px 0px #b3b2ba50',
            }}
          >
            {count}
          </Box>
        )}

      </Typography>

    </Box>
  )

}


export default Tab;