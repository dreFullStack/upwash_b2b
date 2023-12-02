import React, { 
  useEffect, 
  useState 
} from "react";

// MUI components
import {
  Box,
  Breadcrumbs,
  Typography,
  FormControl
} from "@mui/material";

// Form and InvoiceInfo table component
import InvoiceForm from "./components/InvoiceForm";
import InvoiceInfo from "./components/InvoiceInfo";

// axios
import axios from "axios";

function Invoices() {
  // State defining if the tab is in edit/view mode
  // NOTE: temporary solution. Would it make sense to export to a separate state slice?
  const [ isEditMode, setIsEditMode ] = useState(false);
  
  // Initializing state for invoiceInfo fetched from the server
  // NOTE: temporary solution. Would it make sense to export to a separate state slice?
  const [ invoiceInfo, setInvoiceInfo ] = useState({});

  // Fetch recorded Invoice Info on initial render
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/v1/invoices/invoiceInfo");

        if (!res.data) {
          setIsEditMode(true);
        }

        return setInvoiceInfo(res.data);
      } catch (err) {
        console.log(err);
      };
    };

    fetchData();
  }, []);

  return(
    <Box
      sx={{
        display: "flex",
        flexDirection: "column"
      }}
    >

      {/* Breadcrumbs */}
      <Breadcrumbs
        aria-label="breadcrumbs"
        sx={{
          marginBottom: "25px",
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
          Invoices
        </Typography>
      </Breadcrumbs>
      {isEditMode
        ? <InvoiceForm 
            invoiceInfo={invoiceInfo}
            setInvoiceInfo={setInvoiceInfo}
            setIsEditMode={setIsEditMode}
          />
        : <InvoiceInfo 
            invoiceInfo={invoiceInfo}
            setIsEditMode={setIsEditMode}
          />
      }
      
    </Box>
  )
};

export default Invoices;