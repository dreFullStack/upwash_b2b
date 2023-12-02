// React
import React, {useState, useEffect} from 'react';

// MUI components
import { 
  Link, 
  Breadcrumbs,
} from '@mui/material';

// React icons
import {
  MdBuild,
  MdAttachMoney
} from 'react-icons/md';

// MUI table components
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

// MUI TablePagination
import TablePagination from '@mui/material/TablePagination';

// Axios
import axios from 'axios';

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.service.name}
        </TableCell>
        <TableCell>{row.status}</TableCell>
        <TableCell>{row.duration}</TableCell>
        <TableCell>{row.price} {row.currency}</TableCell>
        <TableCell>{row.contactPersonName}</TableCell>
        <TableCell>{row.contactPersonPhone}</TableCell>
        <TableCell>{row.date}</TableCell>
        <TableCell>{row.time}</TableCell>
        <TableCell>{row.location}</TableCell>
        <TableCell>
          <Box 
            sx={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "200px",
            }}
          >
            {row.additionalInfo}
          </Box>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell 
          style={{ 
            paddingBottom: 0, 
            paddingTop: 0,
            borderBottom: 'none',
          }} 
          colSpan={11}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography 
                variant="h6" 
                gutterBottom 
                component="div"
                sx={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                }}
              >
                Order vehicles
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>License plate</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Make</TableCell>
                    <TableCell>Model</TableCell>
                    <TableCell>Vin</TableCell>
                    <TableCell>Type</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row?.vehicles?.map((vehicleRow) => (
                    <TableRow key={vehicleRow.id}>
                      <TableCell component="th" scope="row">
                        {vehicleRow.licensePlate}
                      </TableCell>
                      <TableCell>{vehicleRow.name}</TableCell>
                      <TableCell>{vehicleRow.make}</TableCell>
                      <TableCell>{vehicleRow.model}</TableCell>
                      <TableCell>{vehicleRow.vin}</TableCell>
                      <TableCell>{vehicleRow.vehicleType.code}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

function Orders(){

  const [ordersCount, setOrdersCount] = useState(null);
  const [orders, setOrders]           = useState([]);

  // Pagination
  const [page, setPage]               = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  }

  // Fetch orders count
  useEffect(() => {

    const fetchOrdersCount = async () => {
      const res = await axios.get('http://localhost:5000/api/v1/order/fleetManagerOrdersCount');
      setOrdersCount(res.data);
    }
    
    fetchOrdersCount();

  }, []);

  // Fetch orders
  useEffect(() => {

    const fetchOrders = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/v1/order/fleetManagerOrders?skip=${page * rowsPerPage}&take=${rowsPerPage}`
      );
      setOrders(res.data);
    }

    fetchOrders();

  }, [page, rowsPerPage]);

  console.log('Orders; ordersCount -> ', ordersCount);
  console.log('Orders; orders -> ', orders);

  if(!ordersCount || !orders){
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
        <Typography 
          color="text.primary"
        >
          Orders
        </Typography>
      </Breadcrumbs>

      {/* Title */}
      <Typography
        sx={{
          fontFamily: 'FKGrotesk-Bold',
          fontSize: '24px',
          color: '#000',
        }}
      >
        Orders
      </Typography>

      {/* Orders count */}
      <Typography
        sx={{
          fontFamily: 'FKGrotesk-Regular',
          fontSize: '16px',
          color: '#000',
          marginTop: '15px',
        }}
      >
        <b>Orders count</b>: {ordersCount || "N/A"}
      </Typography>

      {/* Orders table */}
      <Box 
        sx={{
          display: 'flex',
          flexDirection: 'column',
          marginTop: '25px',
        }}
      >

        <TableContainer 
          component={Paper}
          sx={{
            padding: '15px',
            border: '1px #b3b2ba solid',
            borderRadius: '4px',
            boxShadow: '0px 2.5px 2.5px 0px #b3b2ba50',
          }}
        >
          <Table 
            aria-label="collapsible table"
            size="small"
            sx={{
              '& .MuiTableCell-root': {
                padding: '0px',
                fontSize: '12px'
              }
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Service</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Duration</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Contact name</TableCell>
                <TableCell>Contact phone</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Additional info</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders?.map((row) => (
                <Row key={row.id} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>

      </Box>

      {/* Pagination */}
      <TablePagination
        component="div"
        count={ordersCount}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          alignSelf: 'flex-start',
        }}
      />

    </Box>
  );

} 

export default Orders;