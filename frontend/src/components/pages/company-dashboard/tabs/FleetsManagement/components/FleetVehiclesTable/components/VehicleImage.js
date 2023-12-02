// React
import React from 'react';

// MUI components

import {
  Box
} from '@mui/material';

function getImage(type){

  // const mainType = type.split('-')[0];

  const imgProps = {
    width: "20px",
    height: "20px",
  };

  switch (type) {
    case 'sedan-small':
      return <img src="/images/sedan.png" alt="Sedan" {...imgProps} />;
    case 'sedan-medium':
      return <img src="/images/sedan.png" alt="Sedan" {...imgProps} />;
    case 'sedan-large':
      return <img src="/images/sedan.png" alt="Sedan" {...imgProps} />;

    case 'van-small':
      return <img src="/images/van.png" alt="Van" {...imgProps} />;
    case 'van-medium':
      return <img src="/images/van.png" alt="Van" {...imgProps} />;
    case 'van-large':
      return <img src="/images/van.png" alt="Van" {...imgProps} />;

    case 'suv-small':
      return <img src="/images/suv.png" alt="Suv" {...imgProps} />;
    case 'suv-medium':
      return <img src="/images/suv.png" alt="Suv" {...imgProps} />;
    case 'suv-large':
      return <img src="/images/suv.png" alt="Suv" {...imgProps} />;

    case 'bulldozer-small':
      return <img src="/images/bulldozer.png" alt="Bulldozer" {...imgProps} />;
    case 'bulldozer-medium':
      return <img src="/images/bulldozer.png" alt="Bulldozer" {...imgProps} />;
    case 'bulldozer-large':
      return <img src="/images/bulldozer.png" alt="Bulldozer" {...imgProps} />;

    case 'forklift-small':
      return <img src="/images/forklift.png" alt="Forklift" {...imgProps} />;
    case 'forklift-medium':
      return <img src="/images/forklift.png" alt="Forklift" {...imgProps} />;
    case 'forklift-large':
      return <img src="/images/forklift.png" alt="Forklift" {...imgProps} />;

    case 'excavator-small':
      return <img src="/images/excavator.png" alt="Excavator" {...imgProps} />;
    case 'excavator-medium':
      return <img src="/images/excavator.png" alt="Excavator" {...imgProps} />;
    case 'excavator-large':
      return <img src="/images/excavator.png" alt="Excavator" {...imgProps} />;

    case 'truck-small':
      return <img src="/images/truck.png" alt="Excavator" {...imgProps} />;
    case 'truck-medium':
      return <img src="/images/truck.png" alt="Excavator" {...imgProps} />;
    case 'truck-large':
      return <img src="/images/truck.png" alt="Excavator" {...imgProps} />;
    default:
      return null;
  }

}

// TODO: add unknown image
function VehicleImage({type='unknown'}){

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // border: '1px #b3b2ba solid',
        // boxShadow: '0px 2.5px 2.5px 0px #b3b2ba50',
        // borderRadius: '5px',
        width: '20px',
        height: '20px',
        backgroundColor: '#fff',
        // border: '1px #005ced solid',
        boxSizing: 'border-box',
      }}
    >
      {getImage(type)}
    </Box>
  );

}

export default VehicleImage;