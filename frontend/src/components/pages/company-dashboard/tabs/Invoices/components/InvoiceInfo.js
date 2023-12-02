import React from 'react';

// MUI table components
import Table          from '@mui/material/Table';
import TableBody      from '@mui/material/TableBody';
import TableCell      from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow       from '@mui/material/TableRow';
import Paper          from '@mui/material/Paper';

import {
  Box,
  Typography,
} from "@mui/material";

// UI components
import PrimaryButton from '../../../../../ui/PrimaryButton';

function InvoiceInfo({
  invoiceInfo,
  setIsEditMode
}) {
  // NOTE: Some of the components are copy pasted from CompanyInfo.js
  // Could be exported to a reusable component
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        borderTopLeftRadius: '5px',
        borderTopRightRadius: '5px',
        maxWidth: '500px',
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
          width: "100%",
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
            width: "100%",
            '& .MuiTableCell-root': {
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
                Company Name
              </TableCell>
              <TableCell>
                {invoiceInfo.companyName}
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
                Company Number
              </TableCell>
              <TableCell>
                {invoiceInfo.companyNumber}
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
                Contact Person Name
              </TableCell>
              <TableCell>
                {invoiceInfo.contactPersonName}
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
                Contact Person Number
              </TableCell>
              <TableCell>
                {invoiceInfo.contactPersonNumber}
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
                Delivery
              </TableCell>
              <TableCell>
                {invoiceInfo.deliveryType}
              </TableCell>
            </TableRow>

            {/* PRESENTS FIELDS REQUIRED FOR VERKKOLASKU */}
            {invoiceInfo.deliveryType === "VERKKOLASKU" &&
              <>
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
                    Verkkolaskutusosoite
                  </TableCell>
                  <TableCell>
                    {invoiceInfo.verkkolaskutusosoite}
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
                    Operaattoritunnus
                  </TableCell>
                  <TableCell>
                    {invoiceInfo.operaattoritunnus}
                  </TableCell>
                </TableRow>
              </>
            }
            
            {/* PRESENTS FIELDS REQUIRED FOR EMAIL */}
            {invoiceInfo.deliveryType === "EMAIL" &&
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
                  {invoiceInfo.email}
                </TableCell>
              </TableRow>
            }

            {/* PRESENTS FIELDS REQUIRED FOR POST DELIVERY */}
            {
              <>
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
                    Invoicing Address
                  </TableCell>
                  <TableCell>
                    {invoiceInfo.invoicingAddress}
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
                    Invoicing Post Code
                  </TableCell>
                  <TableCell>
                    {invoiceInfo.invoicingPostCode}
                  </TableCell>
                </TableRow>
              </>
            }
          </TableBody>
        </Table>
      </TableContainer>
      <PrimaryButton
        sx={{
          width: 'fit-content',
          fontFamily: 'FKGrotesk-Regular',
          fontSize: '14px',
          marginTop: '10px',
        }}
        onClick={() => setIsEditMode(true)}
      >
        Edit
      </PrimaryButton>
    </Box>
  )
};

export default InvoiceInfo;