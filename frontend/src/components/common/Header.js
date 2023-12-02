// React
import React from 'react';

// MUI components
import {Box, Typography} from '@mui/material';

// React icons
import {
  MdLogout
} from 'react-icons/md';

function Header(){

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        height: '60px',
        backgroundColor: '#005ced',
        borderBottom: '2px #f2f2f2 solid'
      }}
    >
      {/* Inner wrapper */}
      <Box sx={{
        maxWidth: '1400px',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 20px',
        margin: '0 auto',
      }}>

        {/* Logo wrapper */}
        <Box>
          <Typography
            sx={{ 
              fontFamily: 'FKGrotesk-Regular',
              color: '#FFF',
              fontSize: '16px',
            }}    
          >
            {/* upwash.fi */}
            {/* fleety */}
            <img 
              src="/assets/images/fleety_logo_white.png"
              alt="Fleety logo"
              height="30px"
            />
          </Typography>
        </Box>

        {/* Logout button */}
        <Box
          sx={{
            cursor: 'pointer',
          }}
        >
          <MdLogout
            size={'18px'}
            color={'#FFF'}
          />
        </Box>
      </Box>
    </Box>
  );

}

export default Header;