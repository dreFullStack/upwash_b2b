// React
import React from 'react';

// React icons
import {
  MdWaterDrop,
  MdOutlineCarRepair,
  MdOutlineTireRepair,
  MdDirectionsCar
} from 'react-icons/md';

function ServiceIcon({ serviceCode, ...rest }) {
  if (
    serviceCode.includes('water') || 
    serviceCode.includes('oil') || 
    serviceCode.includes('wash') 
  ) {
    return <MdWaterDrop {...rest}/>;
  } else if (serviceCode.includes('repair')) {
    return <MdOutlineCarRepair {...rest}/>;
  } else if (serviceCode.includes('tire')) {
    return <MdOutlineTireRepair {...rest}/>;
  } else if (serviceCode.includes('maintenance')) {
    return <MdDirectionsCar {...rest}/>;
  } else {
    return <MdWaterDrop {...rest}/>;
  }
}

export default ServiceIcon;