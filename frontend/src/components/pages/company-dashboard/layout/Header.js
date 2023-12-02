// React
import React from 'react';

// MUI components
import { styled } from "@mui/material";
import {Box, Typography} from '@mui/material';

// React icons
import {
  MdLogout
} from 'react-icons/md';

// State managment
import {useDispatch} from 'react-redux';
import {logoutUser} from '../../../../redux-slices/user';

const PulsatingDot = styled("span")({
  "@keyframes pulsate": {
    '0%': {
      boxShadow: '0 0 0 0 #00b30050'
    },
    '50%': {
      boxShadow: '0 0 0 2.5px #00b30050'
    },
    '100%': {
      boxShadow: '0 0 0 0 #00b30050'
    }
  },
  animation: "pulsate 2s infinite ease",
  
  width: '8px',
  height: '8px',
  borderRadius: '50%',
  backgroundColor: '#00b300',
  boxShadow: '0 0 0 2.5px #00b30050'
});

function PlatformStatus(){

  return (
    <Box 
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        boxShadow: '0px 2.5px 2.5px 0px #00050',
        backgroundColor: '#FFF',
        padding: '2.5px 10px',
        borderRadius: '25px'
      }}
    >
      {/* <Box 
        sx={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: '#00b300',
          boxShadow: '0 0 0 2.5px #00b30050'
        }}
        component={'span'}
      /> */}

      <PulsatingDot/>

      <Typography
        sx={{
          fontFamily: 'FKGrotesk-Regular',
          color: '#000',
          fontSize: '14px',
        }}
      >
        Online
      </Typography>

    </Box>
  );

}

function Header(){

  const dispatch = useDispatch();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        height: '60px',
        backgroundColor: '#536e81',
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
            <img 
              src="/images/fleety_logo_white.png"
              alt="Fleety logo"
              height="25px"
            />
          </Typography>
        </Box>

        <Box 
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px'
          }}
        >
          {/* Platform status */}
          <PlatformStatus />

          {/* Logout button */}
          <Box
            sx={{
              cursor: 'pointer',
            }}
            onClick={() => {
              dispatch(logoutUser());
              window.location.href = '/login';
            }}  
          >
            <MdLogout
              size={'18px'}
              color={'#FFF'}
            />
          </Box>
        </Box>

      </Box>
    </Box>
  );

}

export default Header;