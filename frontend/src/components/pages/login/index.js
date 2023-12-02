// React
import React, {cloneElement} from "react";

// Custom UI components
// import PrimaryButton from "../../ui/PrimaryButton";

// MUI components
import {
  Box,
  Typography
} from "@mui/material";

// React icons
import {
  MdOutlineLocalCarWash,
  MdAccessTime,
  MdInsertChartOutlined,
  MdHistory
} from "react-icons/md";

// Login page components
import FeatureItem from "./components/FeatureItem";
import LoginForm from "./components/LoginForm";

function Login() {
  return (
    <>
      <Box 
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: 'calc(100vh)',
          width: '100%',
        }}
      >

        <Box 
          sx={{
            flex: '1',
            width: '45%',
            // backgroundColor: '#005ced',
            backgroundColor: '#536e81',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            position: 'relative',
            height: '100%',
            padding: '25px',
            boxSizing: 'border-box',
            maxWidth: '650px',
          }}
        >

          <Box 
            sx={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
            }}
          >

            <img 
              src="/images/fleety_logo_white.png"
              alt="Fleety logo"
              height="25px"
              style={{
                width: 'fit-content',
              }}
            />

            {/* Features */}
            <Box 
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '50px',
                paddingInline: '50px',
                justifyContent: 'center',
                height: "100%"
              }}
            >

              <FeatureItem
                icon={<MdOutlineLocalCarWash/>}
                title={'On-Demand Vehicle Washing'}
                description={'Revolutionize fleet maintenance with FMaaS On-Demand Vehicle Washing. Convenient, tailored washes for your fleet. Join us now.'}
              />

              <FeatureItem
                icon={<MdAccessTime/>}
                title={'Fleet-wide Wash Scheduling'}
                description={'Effortlessly schedule fleet-wide washes with ease. Simplify fleet maintenance today.'}
              />

              <FeatureItem
                icon={<MdInsertChartOutlined/>}
                title={'Cost Tracking'}
                description={'Effortlessly manage fleet costs with our advanced Cost Tracking feature. Gain insights, optimize budget, and make informed decisions for financial health. Take charge of expenses and drive efficiency today.'}
              />

              <FeatureItem
                icon={<MdHistory/>}
                title={'Service History'}
                description={'Gain insights on fleet maintenance with our Service History feature. Access records of vehicle washes and maintenance activities.'}
              />

            </Box>

          </Box>

        </Box>

        <Box
          sx={{
            width: '100%',
            flex: '1',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            height: '100%',
            padding: '75px',
            boxSizing: 'border-box',
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: '0',
              left: '0',
              width: '100%',
              height: '100%',
              backgroundImage: 'url(/images/uw_truck_washing.jpg)',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              opacity: '0.05',
              zIndex: '-1'
            }
          }}
        >

          <Typography sx={{
            fontSize: '24px',
            fontFamily: 'FKGrotesk-Bold'
          }}>
            Get started by logging in
          </Typography>

          <Typography sx={{
            fontSize: '16px',
            fontFamily: 'FKGrotesk-Regular',
            color: '#69696d',
            marginTop: '5px'
          }}>
            Please enter your details to sign in
          </Typography>

          <Box 
            sx={{
              maxWidth: '400px',
              marginTop: '25px'
            }}
          >
            <LoginForm/>
          </Box>

        </Box>
          
      </Box>
    </>
  );
}

export default Login;