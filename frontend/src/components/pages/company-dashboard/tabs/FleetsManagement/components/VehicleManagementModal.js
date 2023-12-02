// React
import React, {cloneElement} from 'react';

// MUI modal components
import Modal         from '@mui/material/Modal';

// MUI table components
import Table          from '@mui/material/Table';
import TableBody      from '@mui/material/TableBody';
import TableCell      from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead      from '@mui/material/TableHead';
import TableRow       from '@mui/material/TableRow';
import Paper          from '@mui/material/Paper';

// MUI pagination components
import Pagination     from '@mui/material/Pagination';

import {
  Box,
  Typography,
  Button,
} from '@mui/material';

// React icons
import {
  HiInformationCircle,
  HiCalendar,
  HiCash
} from 'react-icons/hi';

function ToolbarItem({
  icon,
  isActive=false,
  children, 
  ...rest
}){
  
  return (
    <Box 
      sx={{
        width: '35px',
        height: '35px',
        borderRadius: '5px',
        backgroundColor: isActive ? '#005ced' : '#fff',
        cursor: 'pointer',
        display: 'flex',  
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0px 2.5px 2.5px 0px #b3b2ba50'
      }}
      {...rest}
    >
      {cloneElement(icon, {
        size: '18px',
        color: isActive ? '#fff' : '#000',
      })}
    </Box>
  );
  
}

function Toolbar(){

  return (
    <Box 
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
        marginBlock: '10px',
        // TODO: fix this
        minWidth: '45px',
        maxWidth: '45px',
      }}
    >

      <ToolbarItem
        icon={<HiInformationCircle/>}
        isActive={true}
      />

      <ToolbarItem
        icon={<HiCalendar/>}
      />

      <ToolbarItem
        icon={<HiCash/>}
      />

    </Box>
  );

}

// TODO: duplicate code from FleetVehiclesTable.js
function ActionButton({
  children,
  ...rest
}){

  return (
    <Button 
      variant="outlined"
      sx={{
        fontSize: '12px',
        textTransform: 'none',
        borderRadius: '5px',
        lineHeight: '16px',
        paddingBlock: '2.5px',
        paddingInline: '10px',
        textDecoration: 'none',
        backgroundColor: 'white',
        color: '#333040',
        border: '1px #005ced solid',
        
        '&:hover': {
          border: '1px #005ced solid',
        },
      }}
      {...rest}
    >
      {children}
    </Button>
  );

}

function createVehicleInformationData(
  name,
  value,
) {
  return { name, value };
}

const vehicleInformationRows = [
  createVehicleInformationData('Vehicle Id', '123456789'),
  createVehicleInformationData('Vehicle Type', 'Truck'),
  createVehicleInformationData('License Plate', 'ABC-123'),
  createVehicleInformationData('VIN', '123456789'),
  createVehicleInformationData('Make', 'Toyota'),
  createVehicleInformationData('Model', 'Camry'),
  createVehicleInformationData('Mileage', '50,000'),
  createVehicleInformationData('Last Washed', '2023-06-01'),
  createVehicleInformationData('Next Wash', '2023-06-15'),
  createVehicleInformationData('Fuel Type', 'Gasoline'),
  createVehicleInformationData('Color', 'Silver'),
  createVehicleInformationData('Year', '2018'),
  createVehicleInformationData('Owner', 'John Doe'),
  createVehicleInformationData('Insurance', 'ABC123456'),
  createVehicleInformationData('Engine Number', 'ABCDEF123456'),
  createVehicleInformationData('Transmission', 'Automatic'),
  createVehicleInformationData('Service History', 'Available'),
];

function createServiceData(
  date,
  time,
  duration,
  serviceType,
  status,
  worker,
  costs,
) {
  return { 
    date,
    time,
    duration,
    serviceType,
    status,
    worker,
    costs,
  };
}

const serviceRows = [
  createServiceData('2023-06-01', '09:00', '1 hour', 'Basic Wash', 'Completed', 'John', '$50'),
  createServiceData('2023-06-05', '14:30', '2 hours', 'Premium Wash', 'Completed', 'Sarah', '$80'),
  createServiceData('2023-06-10', '11:00', '1.5 hours', 'Interior Detailing', 'Completed', 'Mike', '$120'),
  createServiceData('2023-06-12', '16:00', '1 hour', 'Exterior Detailing', 'Completed', 'Lisa', '$90'),
  createServiceData('2023-06-15', '10:30', '1.5 hours', 'Basic Wash', 'Completed', 'Tom', '$50'),
  createServiceData('2023-06-20', '13:45', '2 hours', 'Premium Wash', 'Completed', 'Emily', '$80'),
  createServiceData('2023-06-23', '11:30', '1 hour', 'Interior Detailing', 'Completed', 'Alex', '$120'),
  createServiceData('2023-06-27', '15:00', '1 hour', 'Exterior Detailing', 'Completed', 'Oliver', '$90'),
  createServiceData('2023-07-01', '09:30', '1.5 hours', 'Basic Wash', 'Completed', 'Sophia', '$50'),
  createServiceData('2023-07-05', '14:00', '2 hours', 'Premium Wash', 'Completed', 'Ethan', '$80'),
  createServiceData('2023-07-10', '11:30', '1.5 hours', 'Interior Detailing', 'Upcoming', 'Emma', '$120'),
  createServiceData('2023-07-12', '16:30', '1 hour', 'Exterior Detailing', 'Upcoming', 'Daniel', '$90'),
  createServiceData('2023-07-15', '10:00', '1.5 hours', 'Basic Wash', 'Upcoming', 'Liam', '$50'),
  createServiceData('2023-07-20', '13:15', '2 hours', 'Premium Wash', 'Upcoming', 'Ava', '$80'),
  createServiceData('2023-07-23', '11:45', '1 hour', 'Interior Detailing', 'Upcoming', 'Mia', '$120'),
];

function VehicleManagementModal({children, ...rest}){

  return (
    <Modal
      {...rest}
    >

      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "950px",
        // NOTE: we can specify colors using the theme values
        // bgcolor: 'background.paper',
        // backgroundColor: '#f9f9f9',
        backgroundColor: '#fff',
        padding: '15px',
        boxShadow: '0px 2.5px 2.5px 0px #b3b2ba50',
        borderRadius: '5px',
        maxHeight: '90vh',
        overflowY: 'auto',
      }}>

        <Typography 
          sx={{
            fontFamily: 'FKGrotesk-Bold',
            fontSize: '26px',
          }}
        >
          Vehicle management
        </Typography>
       
        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: '10px',
          marginTop: '15px',
        }}>

          {/* Toolbar */}
          <Toolbar/>

          {/* Tab contents */}
          <Box
            sx={{
              borderRadius: '5px',
              backgroundColor: '#fff',
              padding: '10px',
              gap: '10px',
              display: 'flex',
              width: '100%',
            }}
          >

            {/* Information about vehicle */}
            <Box 
              sx={{
                flexDirection: 'column',
                gap: '10px',
                display: 'flex',
                padding: '5px',
                width: '275px',
              }}
            >
              
              <Typography
                sx={{
                  fontWeight: 'bold',
                  marginBottom: '10px',
                  fontSize: '18px',
                }}
              >
                Vehicle information
              </Typography>

              <TableContainer 
                component={Paper}
                sx={{
                  boxShadow: 'none',
                  border: '1px #b3b2ba solid',
                }}
              >
                <Table 
                  // sx={{ minWidth: 650 }} 
                  size="small" 
                  // aria-label="a dense table"
                  sx={{
                    '& .MuiTableCell-root': {
                      padding: '5px',
                      fontSize: '12px',
                    }
                  }}
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>Parameter</TableCell>
                      <TableCell>Value</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {vehicleInformationRows.map((row, index) => (
                      <TableRow
                        key={row.name+index}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="right">{row.value}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

            </Box>

          {/* Service schedule */}
          <Box 
            sx={{
              flexDirection: 'column',
              gap: '10px',
              display: 'flex',
              padding: '5px',
              width: '100%'
            }}
          >

              <Typography 
                sx={{
                  fontWeight: 'bold',
                  marginBottom: '10px',
                  fontSize: '18px',
                }}
              >
                Service schedule
              </Typography>

              <TableContainer 
                component={Paper}
                sx={{
                  boxShadow: 'none',
                  border: '1px #b3b2ba solid',
                }}
              >
                <Table 
                  size="small" 
                  sx={{
                    'width': '100%',
                    '& .MuiTableCell-root': {
                      padding: '5px',
                      fontSize: '12px',
                    }
                  }}
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Time</TableCell>
                      <TableCell>Duration</TableCell>
                      <TableCell>Service</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Worker</TableCell>
                      <TableCell>Costs</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {serviceRows.map((row, index) => (
                      <TableRow
                        key={row.date + index}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          {row.date}
                        </TableCell>
                        <TableCell align="right">{row.time}</TableCell>
                        <TableCell align="right">{row.duration}</TableCell>
                        <TableCell align="right">{row.serviceType}</TableCell>
                        <TableCell align="right">{row.status}</TableCell>
                        <TableCell align="right">{row.worker}</TableCell>
                        <TableCell align="right">{row.costs}</TableCell>
                        <TableCell align="right">
                          <ActionButton
                            disabled={row.status === 'Completed'}
                            onClick={() => {
                              // onVehicleManageButtonClick(vehicle.id);
                            }}
                          >Reschedule</ActionButton>   
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* Pagination */}
              <Pagination  
                count={10} 
                variant="outlined" 
                shape="rounded" 
                sx={{
                  marginTop: '10px',
                }}
              />
              
            </Box>

          </Box>

        </Box>

      </Box>

    </Modal>
  )

}

export default VehicleManagementModal;