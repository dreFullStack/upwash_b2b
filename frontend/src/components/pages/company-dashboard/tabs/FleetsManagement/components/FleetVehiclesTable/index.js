// React
import React from 'react';

// MUI components
import {
  Box,
  Typography,
  Button,
} from '@mui/material';

// MUI table components
import Table          from '@mui/material/Table';
import TableBody      from '@mui/material/TableBody';
import TableCell      from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead      from '@mui/material/TableHead';
import TableRow       from '@mui/material/TableRow';

// React icons
import {
  MdOutlineSpaceDashboard,
  MdOutlineReportGmailerrorred,
  MdArchive,
  MdOutlineModeEditOutline,
  MdOutlineAssignment,
  MdDeleteOutline,
} from 'react-icons/md';

// Custom components
import VehicleStatus        from './components/VehicleStatus';
import VehicleImage         from './components/VehicleImage';
import LicensePlate         from './components/LicensePlate';

// Action Menu 
import ActionMenu from '../../../../../../common/tables/EnhancedTable/ActionMenu';

// axios
import axios from 'axios';

function FleetVehiclesTable({
  rows,
  onVehicleManageButtonClick,
}){

  return (
    <TableContainer>
      <Table 
        sx={{ 
          minWidth: 650,
          '& .MuiTableCell-root': {
            padding: '0px',
            fontSize: '12px',
          }
        }} 
        size="small"
      >
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>License Plate</TableCell>
            <TableCell>VIN</TableCell>
            {/* <TableCell>Health</TableCell> */}
            <TableCell>Make</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Year</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Last service</TableCell>
            <TableCell>Last service date</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((vehicle) => (
            <TableRow
              key={vehicle.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>{vehicle.id}</TableCell>
              <TableCell component="th" scope="row">
                <VehicleImage type={vehicle.vehicleType.code} />
              </TableCell>
              <TableCell>
                {
                  vehicle.licensePlate ? (
                    <LicensePlate>{vehicle.licensePlate}</LicensePlate>
                  ) : (
                    <Typography
                      sx={{
                        color: '#000',
                        fontSize: '12px',
                      }}
                    >
                      [No license]
                    </Typography>
                  )
                }
              </TableCell>
              <TableCell>{vehicle.vin}</TableCell>
              <TableCell>{vehicle.make}</TableCell>
              <TableCell>{vehicle.name}</TableCell>
              <TableCell>{vehicle.year}</TableCell>
              <TableCell>
                {/* TODO: implement vehicle status logic */}
                <VehicleStatus status={"active"}/>
              </TableCell>
              <TableCell>{"27.05 10:00"}</TableCell>
              <TableCell>{"27.05 10:00"}</TableCell>
              <TableCell>

                <ActionMenu
                  items={[
                    {
                      label: "Manage",
                      icon: <MdOutlineSpaceDashboard size="15px" color="#000" />,
                      onClick: (vehicle) => {
                        window.location.href = `/company-dashboard/vehicle-dashboard?vehicleId=${vehicle.id}`;
                      }
                    },
                    {
                      label: "New order",
                      icon: <MdOutlineAssignment size="15px" color="#000" />,
                      onClick: (vehicle) => {
                        window.location.href = `/company-dashboard/new-order?vehicleId=${vehicle.id}`;
                      }
                    },
                    {
                      label: "Edit",
                      icon: <MdOutlineModeEditOutline size="15px" color="#000" />,
                      onClick: (vehicle) => {
                        window.location.href = `/company-dashboard/edit-vehicle?vehicleId=${vehicle.id}`;
                      }
                    },
                    {
                      label: "Delete",
                      icon: <MdDeleteOutline size="15px" color="#000" />,
                      onClick: (vehicle) => {

                        const confirmDelete = window.confirm(`Are you sure you want to delete vehicle ${vehicle.id}?`);

                        if(confirmDelete){

                          axios.delete(`http://localhost:5000/api/v1/vehicles/${vehicle.id}`)
                          .then(res => {
                            alert(`Vehicle ${vehicle.id} was deleted successfully`);
                            window.location.reload();
                          })
                          .catch(err => {
                            alert(`Failed to delete vehicle ${vehicle.id}`);
                          });

                        }
                        

                      }
                    },
                    {
                      label: "Report",
                      icon: <MdOutlineReportGmailerrorred size="15px" color="#000" />,
                      disabled: true,
                      // onClick: (vehicle) => {
                      //   alert("Report vehicle " + vehicle.id);
                      // }
                    },
                    // {
                    //   label: "Archive",
                    //   icon: <MdArchive size="15px" color="#000" />,
                    //   disabled: true,
                    //   // onClick: (vehicle) => {
                    //   //   alert("Archive vehicle " + vehicle.id);
                    //   // } 
                    // }
                  ]}
                  row={vehicle}
                />

              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

}

export default FleetVehiclesTable;