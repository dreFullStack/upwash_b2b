// React
import React from 'react';

// MUI components
import { 
  Box,
  Typography,
  Divider
} from '@mui/material';

// React icons
import {BiUser} from 'react-icons/bi';

// Redux
import {
  useSelector
} from 'react-redux';

function FleetManagerMainInfo(){

  const fleetManagerInfo = useSelector(state => state.companyDashboard.fleetManagerInfo);
  // console.log("FleetManagerMainInfo; fleetManagerInfo: ", fleetManagerInfo);

  return (
    <Box 
      sx={{
        backgroundColor: '#f9f9f9',
        display: 'flex',
        gap: '15px',
        borderRadius: '5px',
        padding: "15px",
        border: '2px #f2f2f2 solid',
        alignItems: 'center',
        maxWidth: '750px',
        boxSizing: 'border-box'
      }}
    >

      {/* Avatar */}
      <Box 
        sx={{
          backgroundColor: '#FFF',
          border: '1px #b3b2ba solid',
          width: "50px",
          height: "50px",
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: "5px",
          boxShadow: '0px 2.5px 2.5px 0px #b3b2ba50'
        }}
      >
        <BiUser
          color="#000"
          size="25px"
        />
      </Box>

      {/* Fleet manager name */}
      <Box 
        sx={{
          display: 'flex',
          flexDirection: 'column',
          // gap: '5px',
        }}
      >

        <Typography
          sx={{
            fontFamily: 'Roboto',
            fontSize: '14px',
            color: '#333040'
          }}
        >
          Fleet manager name
        </Typography>    

        <Typography
          sx={{
            fontFamily: 'Roboto',
            fontWeight: 'bold',
            fontSize: '16px',
          }}
        >
          {fleetManagerInfo.firstName} {fleetManagerInfo.lastName}
        </Typography>    

      </Box>

      {/* Email and phone */}
      <Box 
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '3px',
          marginLeft: 'auto',
        }}
      >

        {/* Email */}
        <Typography
          sx={{
            fontFamily: 'Roboto',
            fontSize: '14px',
            color: '#333040',
            '& span': {
              fontWeight: 'bold',
            }
          }}
        >
          Email: <span style={{float: 'right', marginLeft: '5px'}}>{fleetManagerInfo.email}</span>
        </Typography>
        
        <Divider/>

        <Typography
          sx={{
            fontFamily: 'Roboto',
            fontSize: '14px',
            color: '#333040',
            '& span': {
              fontWeight: 'bold',
            }
          }}
        >
          Phone: <span style={{float: 'right', marginLeft: '5px'}}>{fleetManagerInfo.phone}</span>
        </Typography>

      </Box>

    </Box>
  );

}

export default FleetManagerMainInfo;