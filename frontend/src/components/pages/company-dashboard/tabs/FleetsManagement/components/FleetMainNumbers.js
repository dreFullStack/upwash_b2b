// React
import React, {cloneElement} from 'react';

// MUI components
import {
  Box,
  Typography
} from '@mui/material';

// React icons
import {
  BsArrowDownShort, 
  BsArrowUpShort
} from 'react-icons/bs';

import {
  MdCarCrash,
  MdDirectionsCarFilled,
  MdLocalCarWash,
  MdAttachMoney
} from 'react-icons/md';

// Redux
import {useSelector, useDispatch} from "react-redux";

function MainNumberItem({
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

function MainNumbers(){

  const selectedFleetVehiclesCount = useSelector(state => state.fleetManagement.selectedFleetVehiclesCount);

  return (
    <Box 
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: 'fit-content',
        marginRight: '20px',
        gap: '15px',
        boxSizing: 'border-box',
      }}
    >

      <MainNumberItem
        title="Fleet vehicles"
        number={selectedFleetVehiclesCount}
        // percentageNumber="20"
        icon={<MdDirectionsCarFilled/>}
      />

      {/* <MainNumberItem
        title="Idle vehicles"
        number="50"
        // percentageNumber="5"
        icon={<MdCarCrash/>}
      />

      <MainNumberItem
        title="Vehicles in service"
        number="30"
        // percentageNumber="3"
        icon={<MdLocalCarWash/>}
      /> */}

      <MainNumberItem
        title="Maintenance cost"
        number="2500 €"
        icon={<MdAttachMoney/>}
        // percentageNumber="10"
      />

    </Box>
  );

}


export default MainNumbers;