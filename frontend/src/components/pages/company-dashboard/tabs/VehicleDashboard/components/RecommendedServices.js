// React
import React, {cloneElement} from 'react';

// MUI components
import {
  Box,
  Typography
} from '@mui/material';

// Components
import ServiceCard from './ServiceCard';

// UI components
import PrimaryButton from '../../../../../ui/PrimaryButton';

// React icons
import {
  MdWaterDrop
} from 'react-icons/md';

function RecommendedServices(){

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        boxShadow: '0px 2.5px 2.5px 0px #b3b2ba50',
        borderRadius: '5px',
        padding: '10px',
        border: '1px #b3b2ba solid',
        height: 'fit-content',
      }}
    >

      <Typography
        sx={{
          fontFamily: 'FKGrotesk-Bold',
          fontSize: '16px',
          marginBottom: '10px'
        }}
      >
        Recommended services
      </Typography>

      <ServiceCard
        title="Oil change"
        price={"100 €"}
        duration={"1 hour"}
        icon={
          <MdWaterDrop/>
        }
      />

      <ServiceCard
        title="Change tires"
        price={"100 €"}
        duration={"1 hour"}
        icon={
          <MdWaterDrop/>
        }
      />

      <ServiceCard
        title="Outside wash"
        price={"100 €"}
        duration={"1 hour"}
        icon={
          <MdWaterDrop/>
        }
      />

      <ServiceCard
        title="Inside wash"
        price={"100 €"}
        duration={"1 hour"}
        icon={
          <MdWaterDrop/>
        }
      />

      <ServiceCard
        title="Change tires"
        price={"100 €"}
        duration={"1 hour"}
        icon={
          <MdWaterDrop/>
        }
      />

      <PrimaryButton
        sx={{
          marginTop: '10px'
        }}
        href={
          "/company-dashboard/new-order?vehicleId=" + +new URLSearchParams(window.location.search).get("vehicleId")
        }
      >
        New order
      </PrimaryButton>
      
    </Box>
  );

}

export default RecommendedServices;