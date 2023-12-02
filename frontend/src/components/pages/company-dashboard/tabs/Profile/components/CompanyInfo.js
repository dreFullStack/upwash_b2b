// MUI table components
import Table          from '@mui/material/Table';
import TableBody      from '@mui/material/TableBody';
import TableCell      from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead      from '@mui/material/TableHead';
import TableRow       from '@mui/material/TableRow';
import Paper          from '@mui/material/Paper';

// React
import React from 'react';

// MUI components
import { 
  Box,
  Typography
} from '@mui/material';

// React icons
import {BiUser} from 'react-icons/bi';

// Redux
import {
  useSelector
} from 'react-redux';

function CompanyInfo(){

  const companyInfo = useSelector(state => state.companyDashboard.companyInfo);
  console.log("CompanyInfo; companyInfo: ", companyInfo);

  return (
    <Box 
      sx={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '5px',
        maxWidth: '750px',
      }}
    >
      <Box
        sx={{
          backgroundColor: '#536e81',
          padding: '10px',
          borderTopLeftRadius: '5px',
          borderTopRightRadius: '5px',
        }}
      >
        <Typography
          sx={{
            fontFamily: 'Roboto, sans-serif',
            fontWeight: 'bold',
            fontSize: '14px',
            color: '#FFF',
          }}
        >
          Company Information
        </Typography>
      </Box>
      <TableContainer 
        component={Paper}
        sx={{
          boxShadow: 'none',
          border: '1px #b3b2ba solid',
          borderTopLeftRadius: '0px',
          borderTopRightRadius: '0px',
          boxSizing: 'border-box',
        }}
      >
        <Table 
          size="small" 
          sx={{
            width: '100%',
            // '& .MuiPaper-root': {
            //   borderTopLeftRadius: '0px',
            //   borderTopRightRadius: '0px',
            // },
            '& .MuiTableCell-root': {
              // padding: '10px',
              fontSize: '14px',
            }
          }}
        >
          <TableBody>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell 
                component="th" 
                scope="row" 
                sx={{
                  fontWeight: 'bold',
                }}
              >
                Name
              </TableCell>
              <TableCell>
                {companyInfo.name}
              </TableCell>
            </TableRow>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell 
                component="th" 
                scope="row" 
                sx={{
                  fontWeight: 'bold',
                }}
              >
                Address
              </TableCell>
              <TableCell>
                {companyInfo.address}
              </TableCell>
            </TableRow>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell 
                component="th" 
                scope="row" 
                sx={{
                  fontWeight: 'bold',
                }}
              >
                City
              </TableCell>
              <TableCell>
                {companyInfo.city}
              </TableCell>
            </TableRow>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell 
                component="th" 
                scope="row" 
                sx={{
                  fontWeight: 'bold',
                }}
              >
                Country
              </TableCell>
              <TableCell>
                {companyInfo.country}
              </TableCell>
            </TableRow>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell 
                component="th" 
                scope="row" 
                sx={{
                  fontWeight: 'bold',
                }}
              >
                Email
              </TableCell>
              <TableCell>
                {companyInfo.email}
              </TableCell>
            </TableRow>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell 
                component="th" 
                scope="row" 
                sx={{
                  fontWeight: 'bold',
                }}
              >
                Phone
              </TableCell>
              <TableCell>
                {companyInfo.phone}
              </TableCell>
            </TableRow>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell 
                component="th" 
                scope="row" 
                sx={{
                  fontWeight: 'bold',
                }}
              >
                Website
              </TableCell>
              <TableCell>
                {companyInfo.website}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

    </Box>
  );

}

export default CompanyInfo;