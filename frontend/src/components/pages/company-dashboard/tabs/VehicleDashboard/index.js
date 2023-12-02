// React
import React, {useState, useEffect} from 'react';

// MUI components
import { 
  Box, 
  Link, 
  Breadcrumbs,
  Typography
} from '@mui/material';

// React icons
import {
  MdBuild,
  MdAttachMoney
} from 'react-icons/md';

// Components
import VehicleNumber from './components/VehicleNumber';
import VehicleInformationCard from './components/VehicleInformationCard';
import ServiceStatus from './components/ServiceStatus';

// MUI table components
import Table          from '@mui/material/Table';
import TableBody      from '@mui/material/TableBody';
import TableCell      from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead      from '@mui/material/TableHead';
import TableRow       from '@mui/material/TableRow';
import Paper          from '@mui/material/Paper';

// MUI TablePagination
import TablePagination     from '@mui/material/TablePagination';

// Components
import RecommendedServices from './components/RecommendedServices';

// State management
import {useSelector, useDispatch} from 'react-redux';

import {
  setVehicleInfo,
} from '../../../../../redux-slices/vehicle-dashboard';

// Axios
import axios from 'axios';

import createServiceData from './utils/createServiceData';

const serviceRows = [
  createServiceData('2023-06-01', '09:00', '1 hour', 'Basic Wash', 'completed', '$50'),
  createServiceData('2023-06-05', '14:30', '2 hours', 'Premium Wash', 'completed', '$80'),
  createServiceData('2023-06-10', '11:00', '1.5 hours', 'Interior Detailing', 'completed', '$120'),
  createServiceData('2023-06-12', '16:00', '1 hour', 'Exterior Detailing', 'completed', '$90'),
  createServiceData('2023-06-15', '10:30', '1.5 hours', 'Basic Wash', 'completed', '$50'),
  createServiceData('2023-06-20', '13:45', '2 hours', 'Premium Wash', 'completed', '$80'),
  createServiceData('2023-06-23', '11:30', '1 hour', 'Interior Detailing', 'completed', '$120'),
  createServiceData('2023-06-27', '15:00', '1 hour', 'Exterior Detailing', 'completed', '$90'),
  createServiceData('2023-07-01', '09:30', '1.5 hours', 'Basic Wash', 'completed', '$50'),
  createServiceData('2023-07-05', '14:00', '2 hours', 'Premium Wash', 'completed', '$80'),
  createServiceData('2023-07-10', '11:30', '1.5 hours', 'Interior Detailing', 'upcoming', '$120'),
  createServiceData('2023-07-12', '16:30', '1 hour', 'Exterior Detailing', 'upcoming', '$90'),
  createServiceData('2023-07-15', '10:00', '1.5 hours', 'Basic Wash', 'upcoming', '$50'),
  createServiceData('2023-07-20', '13:15', '2 hours', 'Premium Wash', 'upcoming', '$80'),
  createServiceData('2023-07-23', '11:45', '1 hour', 'Interior Detailing', 'upcoming', '$120'),
];

function VehicleDashboard(){

  const vehicleInfo = useSelector((state) => state.vehicleDashboard.vehicleInfo);
  console.log("VehicleDashboard; vehicleInfo -> ", vehicleInfo);

  const dispatch = useDispatch();

  // Fetch vehicle information
  useEffect(() => {

    const fetchVehicleInformation = async () => {

      console.log("fetchVehicleInformation;");

      const vehicleId = +new URLSearchParams(window.location.search).get("vehicleId");
      console.log("fetchVehicleInformation; vehicleId -> ", vehicleId);

      const vehicleInformation = await axios.get(`http://localhost:3005/api/v1/vehicles/vehicleInfo?vehicleId=${vehicleId}`);
      console.log("fetchVehicleInformation; vehicleInformation -> ", vehicleInformation.data);

      dispatch(setVehicleInfo(vehicleInformation.data));

    };

    fetchVehicleInformation();

  }, [dispatch]);

  // Services table pagination
  const [servicesCount, setServicesCount] = useState(serviceRows.length);
  const [servicesPerPage, setServicesPerPage] = useState(25);

  const [servicesSkip, setServicesSkip] = useState(0);
  const [servicesTake, setServicesTake] = useState(25);

  const handleServicesChangePage = (event, newPage) => {
    setServicesSkip(servicesPerPage * newPage);
    setServicesTake(servicesPerPage);
  };

  const handleServicesChangeRowsPerPage = (event) => {
    setServicesPerPage(parseInt(event.target.value, 10));
    setServicesCount(servicesCount + servicesPerPage);
  };

  if(!vehicleInfo){
    return "Loading...";
  }

  return (
    <Box 
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >

      {/* Breadcrumbs */}
      <Breadcrumbs 
        aria-label="breadcrumb"
        sx={{
          marginBottom: '25px',
        }}
      >
        <Typography 
          color="text.primary"
        >
          Company Dashboard
        </Typography>
        <Link 
          underline="hover"
          color="inherit" href="/company-dashboard/fleets-management"
        >
          Fleets Management
        </Link>
        <Typography 
          color="text.primary"
        >
          Vehicle Dashboard
        </Typography>
      </Breadcrumbs>

      {/* Vehicle dashboard */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '25px'
        }}
      >

        <Box 
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >

          {/* Title */}
          <Typography
            sx={{
              fontFamily: 'FKGrotesk-Bold',
              fontSize: '24px',
              color: '#000',
            }}
          >
            Vehicle dashboard
          </Typography>

          {/* Vehicle name */}
          <Typography
            sx={{
              fontFamily: 'FKGrotesk-Regular',
              fontSize: '16px',
              color: '#000',
            }}
          >
            <b>Vehicle name</b>: {vehicleInfo?.name || "N/A"}
          </Typography>

          {/* Vehicle type */}
          <Typography
            sx={{
              fontFamily: 'FKGrotesk-Regular',
              fontSize: '16px',
              color: '#000',
            }}
          >
            <b>Vehicle type</b>: {vehicleInfo?.vehicleType?.code || "N/A"}
          </Typography>

        </Box>

        <Box 
          sx={{
            display: 'flex',
            gap: '10px',
          }}
        >

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >

            {/* Vehicle numbers */}
            <Box 
              sx={{
                display: 'flex',
                gap: '10px',
                maxWidth: '800px',
              }}
            >
              <VehicleNumber
                title="Total orders"
                number="84"
                icon={<MdBuild/>}
              />
              <VehicleNumber
                title="Orders last 30 days"
                number="5"
                icon={<MdBuild/>}
              />
              <VehicleNumber
                title="Avg. service. costs"
                number="10"
                icon={<MdAttachMoney/>}
              />
              <VehicleNumber
                title="Upcoming services"
                number="2"
                icon={<MdBuild/>}
              />
            </Box>

            {/* Vehicle information and service schedule wrapper*/}
            <Box 
              sx={{
                display: 'flex',
                gap: '10px',
              }}
            >

              {/* Vehicle information */}
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}
              >

                <VehicleInformationCard
                  title="License plate"
                  value={vehicleInfo?.licensePlate || "N/A"}
                />

                <VehicleInformationCard
                  title="VIN"
                  value={vehicleInfo?.vin || "N/A"}
                />

                <VehicleInformationCard
                  title="Make"
                  value={vehicleInfo?.make || "N/A"}
                />

                <VehicleInformationCard
                  title="Model"
                  value={vehicleInfo?.model || "N/A"}
                />

                <VehicleInformationCard
                  title="Year"
                  value={vehicleInfo?.year || "N/A"}
                />

                <VehicleInformationCard
                  title="Color"
                  value={vehicleInfo?.color || "N/A"}
                />

                <VehicleInformationCard
                  title="Country"
                  value={vehicleInfo?.country || "N/A"}
                />

              </Box>

              {/* Service schedule */}
              <Box 
                sx={{
                  flexDirection: 'column',
                  gap: '10px',
                  display: 'flex',
                  width: '100%',
                  maxWidth: '750px',
                }}
              >

                <TableContainer 
                  component={Paper}
                  sx={{
                    boxShadow: '0px 2.5px 2.5px 0px #b3b2ba50',
                    border: '1px #b3b2ba solid',
                  }}
                >
                  <Table 
                    size="small" 
                    sx={{
                      width: '100%',
                      '& .MuiTableCell-root': {
                        padding: '5px 10px',
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
                          <TableCell 
                            component="th"
                            scope="row"
                          >{row.date}</TableCell>
                          <TableCell>{row.time}</TableCell>
                          <TableCell>{row.duration}</TableCell>
                          <TableCell>{row.serviceType}</TableCell>
                          <TableCell>
                            <ServiceStatus  
                              status={row.status}
                            />
                          </TableCell>
                          <TableCell>{row.costs}</TableCell>
                          <TableCell>
                            Action
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                {/* TablePagination */}
                <TablePagination
                  component="div"
                  count={servicesCount}
                  page={servicesSkip / servicesTake}
                  onPageChange={handleServicesChangePage}
                  rowsPerPage={servicesPerPage}
                  onRowsPerPageChange={handleServicesChangeRowsPerPage}
                  sx={{
                    marginTop: '10px',
                  }}
                />
                  
              </Box>

            </Box>
          </Box>
          
          {/* Recommended services */}
          <RecommendedServices/>

        </Box>
        
      </Box>
      
    </Box>
  );

}

export default VehicleDashboard;