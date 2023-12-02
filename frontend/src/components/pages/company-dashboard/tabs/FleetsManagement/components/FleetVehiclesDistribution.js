// React
import React from 'react';

// Chart.js
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

// Redux
import { useSelector } from 'react-redux';

// MUI components
import {
  Box,
  Typography,
} from '@mui/material';

ChartJS.register(ArcElement, Tooltip, Legend);

// const getChartData = (fleetVehicles) => {
//   const vehiclesTypesCount = {};

//   fleetVehicles.forEach(vehicle => {
//     if(vehiclesTypesCount[vehicle.vehicleType.code] === undefined){
//       vehiclesTypesCount[vehicle.vehicleType.code] = 1;
//     }
//     else{
//       vehiclesTypesCount[vehicle.vehicleType.code] += 1;
//     }
//   });

//   return {
//     // labels: ['Sedan', 'Forklift', 'Van', 'Excavator'],
//     labels: Object.keys(vehiclesTypesCount),
//     datasets: [
//       {
//         label: '# of Vehicles',
//         // data: [8, 4, 10, 6],
//         data: Object.values(vehiclesTypesCount),
        // backgroundColor: [
        //   'rgba(255, 99, 132, 0.2)', // Sedan
        //   'rgba(54, 162, 235, 0.2)', // Forklift
        //   'rgba(255, 206, 86, 0.2)', // Van
        //   'rgba(75, 192, 192, 0.2)', // Excavator
        // ],
        // borderColor: [
        //   'rgba(255, 99, 132, 1)', // Sedan
        //   'rgba(54, 162, 235, 1)', // Forklift
        //   'rgba(255, 206, 86, 1)', // Van
        //   'rgba(75, 192, 192, 1)', // Excavator
        // ],
        // borderWidth: 1,
//       },
//     ],
//   };

// };

const getChartData = (vehiclesDistribution) => {

  return {
    // labels: ['Sedan', 'Forklift', 'Van', 'Excavator'],
    labels: vehiclesDistribution.map(vehicle => vehicle.code),
    datasets: [
      {
        label: '# of Vehicles',
        data: vehiclesDistribution.map(vehicle => vehicle.count),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)', // Sedan
          'rgba(54, 162, 235, 0.2)', // Forklift
          'rgba(255, 206, 86, 0.2)', // Van
          'rgba(75, 192, 192, 0.2)', // Excavator
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)', // Sedan
          'rgba(54, 162, 235, 1)', // Forklift
          'rgba(255, 206, 86, 1)', // Van
          'rgba(75, 192, 192, 1)', // Excavator
        ],
        borderWidth: 1,
      }
    ],
  };

};

function FleetVehiclesDistribution(){

  // const selectedFleetId            = useSelector(state => state.fleetManagement.selectedFleetId);
  // const fleets                     = useSelector(state => state?.companyDashboard?.fleets);

  const vehiclesDistribution = useSelector(state => state.fleetManagement.vehiclesDistribution);
  console.log("FleetVehiclesDistribution; vehiclesDistribution -> ", vehiclesDistribution);

  if(!vehiclesDistribution){
    return "Loading...";
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '5px',
        boxShadow: '0px 2.5px 2.5px 0px #b3b2ba50',
        padding: '10px',
        border: '1px #b3b2ba solid',
        boxSizing: 'border-box',
        // TODO: fix this
        maxWidth: '230px',
      }}
    >
      <Typography
        sx={{
          fontFamily: 'Roboto',
          fontSize: '12px',
          marginBottom: '15px',
        }}
      >
        Vehicles distribution
      </Typography>
      <Pie
        // data={getChartData(fleets.find(fleet => fleet.id === selectedFleetId).vehicles)}
        data={getChartData(vehiclesDistribution)}
      />
    </Box>
  );

}

export default FleetVehiclesDistribution;