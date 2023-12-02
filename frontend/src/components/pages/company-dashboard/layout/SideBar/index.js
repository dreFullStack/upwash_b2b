// React
import React from 'react';

// State management
import { useSelector } from "react-redux";

// MUI components
import {
  Box, 
  Typography,
  Divider,
  
} from '@mui/material';

// React icons
// import {
//   HiOutlineGlobeAlt,
//   HiOutlineDeviceMobile
// } from 'react-icons/hi';

import {
  BiPieChartAlt,
  BiFile,
  BiBuilding,
  BiCog,
  BiUserVoice,
  BiChat,
  BiSupport,
  BiLineChart,
  BiBell,
  BiUserCircle,
  BiFileBlank
} from 'react-icons/bi';

// SideBar components
import TabChip   from './components/TabChip';
import Tab       from './components/Tab';
import Label     from './components/Label';
import QuickFind from './components/QuickFind';

function SideBar(){

  const compnayInfo = useSelector(state => state.companyDashboard.companyInfo);

  return (
    <Box
      sx={{
        backgroundColor: "#f9f9f9",
        borderRight: '2px #f2f2f2 solid',
        padding: '15px',
        minWidth: '200px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        minHeight: 'calc(100vh - 60px)',
      }}
    >

      {/* Company name */}
      <Box 
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          marginTop: '10px',
          marginBottom: '10px',
        }}
      >

        <Box 
          sx={{
            width: '25px',
            height: '25px',
            // borderRadius: '50px',
            borderRadius: '5px',
            backgroundColor: '#fff',
            border: '1px #b3b2ba solid',
            backgroundImage: 'url(/images/company.png)',
            backgroundSize: '12.5px 12.5px',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            boxShadow: '0px 2.5px 2.5px 0px #b3b2ba50'
          }}
        />

        {/* Company name */}
        <Typography 
          sx={{
            fontWeight: 'bold',
            fontSize: '14px',
            color: '#363348',
            fontFamily: 'FKGrotesk-Bold',
          }}
        >
          {compnayInfo?.name || "Loading..."}
        </Typography>

      </Box>

      {/* Quick find */}
      {/* <QuickFind/> */}

      {/* Tabs wrapper */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}
      >

        {/* General tabs */}
        <Label>General</Label>

        <Tab
          icon={<BiUserCircle/>}
          onClick={() => {
            window.location.href = '/company-dashboard/profile'
          }}
          isActive={
            window.location.pathname === '/company-dashboard/profile'
          }
        >
          Profile
        </Tab>

        <Tab 
          icon={<BiBuilding/>}
          onClick={() => {
            window.location.href = '/company-dashboard/fleets-management'
          }}
          isActive={
            window.location.pathname === '/company-dashboard/fleets-management'
          }
        >
          Fleets
        </Tab>

        <Tab 
          // icon={<HiDocumentText/>}
          icon={<BiFile/>}
          onClick={() => {
            window.location.href = '/company-dashboard/orders'
          }}
          isActive={
            window.location.pathname === '/company-dashboard/orders'
          }
          // disabled={true}
        >
          Orders
          {/* <TabChip>Coming soon</TabChip> */}
        </Tab>

        <Tab 
          icon={<BiFileBlank/>}
          onClick={() => {
            window.location.href = '/company-dashboard/invoices'
          }}
          isActive={
            window.location.pathname === '/company-dashboard/invoices'
          }
        >
          Invoices
        </Tab>

        <Divider sx={{marginBlock: '10px'}}/>

        <Tab 
          icon={<BiPieChartAlt/>}

          onClick={() => {
            window.location.href = '/company-dashboard/overview'
          }}
          isActive={
            window.location.pathname === '/company-dashboard/overview'
          }
          disabled={true}
        >
          Overview
          <TabChip>Coming soon</TabChip>
        </Tab>

        <Tab 
          // icon={<HiCog/>}
          icon={<BiCog/>}
          disabled={true}
          // onClick={() => setActiveTab('settings')}
          // isActive={activeTab === 'settings'}
        >
          Settings
          <TabChip>Coming soon</TabChip>
        </Tab>

        <Tab 
          // icon={<HiPresentationChartBar/>}
          icon={<BiLineChart/>}
          disabled={true}
          // onClick={() => setActiveTab('statistics')}
          // isActive={activeTab === 'statistics'}
        >
          Statistics
          <TabChip>Coming soon</TabChip>
        </Tab>

        <Tab 
          icon={<BiUserVoice/>}
          disabled={true}
          // onClick={() => setActiveTab('users')}
          // isActive={activeTab === 'users'}
        >
          Meetings
          <TabChip>Coming soon</TabChip>
        </Tab>

        <Tab 
          // icon={<HiChatAlt/>}
          icon={<BiChat/>}
          disabled={true}
          // onClick={() => setActiveTab('chat')}
          // isActive={activeTab === 'chat'}
        >
          Chat
          <TabChip>Coming soon</TabChip>
        </Tab>

        <Tab 
          icon={<BiBell/>}
          // isActive={activeTab === 'notifications'}
          count={2}
          disabled={true}
        >
          Notifications
          <TabChip>Coming soon</TabChip>
        </Tab>

        <Divider sx={{marginTop: '10px'}}/>

        {/* Support tabs */}
        <Label>Support</Label>

        <Tab 
          // icon={<HiSupport/>}
          icon={<BiSupport/>}
          onClick={() => {
            window.location.href = '/company-dashboard/support'
          }}
          isActive={
            window.location.pathname === '/company-dashboard/support'
          }
        >Contact</Tab>

      </Box>

       {/* Documentation */}
       <Label>Links</Label>
      
      {/* Notion */}
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        border: '1px #b3b2ba solid',
        padding: '5px',
        borderRadius: '5px',
        backgroundColor: '#fff',
        boxShadow: '0px 2.5px 2.5px 0px #b3b2ba50',
        cursor: 'pointer'
      }}>

        {/* Icon */}
        <Box
          sx={{
            width: '25px',
            height: '25px',
            borderRadius: '5px',
            backgroundColor: '#f9f9f9',
            border: '1px #b3b2ba solid',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >

          <img
            src="/images/notion_logo.png"
            alt="Notion logo"
            width="15px"
            height="15px"
          />

        </Box>

        {/* Label */}
        <Typography
          sx={{
            fontSize: '14px',
            color: "#333040",
          }}
        >
          Documentation
        </Typography>

      </Box>
      
      {/* Youtube */}
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        border: '1px #b3b2ba solid',
        padding: '5px',
        borderRadius: '5px',
        backgroundColor: '#fff',
        boxShadow: '0px 2.5px 2.5px 0px #b3b2ba50',
        cursor: 'pointer'
      }}>

        {/* Icon */}
        <Box
          sx={{
            width: '25px',
            height: '25px',
            borderRadius: '5px',
            backgroundColor: '#f9f9f9',
            border: '1px #b3b2ba solid',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >

          <img
            src="/images/youtube_logo.png"
            alt="Youtube logo"
            width="15px"
          />

        </Box>

        {/* Label */}
        <Typography
          sx={{
            fontSize: '14px',
            color: "#333040",
          }}
        >
          Video guidelines
        </Typography>

      </Box>

      <Divider sx={{marginBlock: '10px'}}/>

      {/* Contact details */}
      <Box 
        sx={{
          marginTop: '15px',
          marginBottom: '15px',     
        }}
      >
        <Typography
          sx={{
            fontSize: '12px',  
          }}
        >
          Phone: +358 40 023 6184
        </Typography>
        <Typography
          sx={{
            fontSize: '12px',  
          }}
        >
          Email: info@upwash.fi
        </Typography>
        <Typography
          sx={{
            fontSize: '12px',  
          }}
        >
          Address: Karjalankatu 2 C, 00520 Helsinki
        </Typography>
        <Typography
          sx={{
            fontSize: '12px',  
          }}
        >
          Business ID: y-3267627-5
        </Typography>
      </Box>

    </Box>
  );

}

export default SideBar;

// {/* Web platform */}
// <Box sx={{
//   display: 'flex',
//   alignItems: 'center',
//   gap: '10px',
//   border: '1px #b3b2ba solid',
//   padding: '5px',
//   borderRadius: '5px',
//   backgroundColor: '#fff',
//   cursor: 'pointer',
//   boxShadow: '0px 2.5px 2.5px 0px #b3b2ba50',
// }}>

//   {/* Icon */}
//   <Box
//     sx={{
//       width: '25px',
//       height: '25px',
//       borderRadius: '5px',
//       backgroundColor: '#f9f9f9',
//       border: '1px #b3b2ba solid',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//     }}
//   >

//     <HiOutlineGlobeAlt
//       color="#898890"
//       size="15px"
//     />

//   </Box>

//   {/* Label */}
//   <Typography
//     sx={{
//       fontSize: '14px',
//       color: "#333040",
//     }}
//   >
//     Web platform
//   </Typography>

// </Box>

// {/* Mobile App */}
// <Box sx={{
//   display: 'flex',
//   alignItems: 'center',
//   gap: '10px',
//   border: '1px #b3b2ba solid',
//   padding: '5px',
//   borderRadius: '5px',
//   backgroundColor: '#fff',
//   boxShadow: '0px 2.5px 2.5px 0px #b3b2ba50',
//   cursor: 'pointer'
// }}>

//   {/* Icon */}
//   <Box
//     sx={{
//       width: '25px',
//       height: '25px',
//       borderRadius: '5px',
//       backgroundColor: '#f9f9f9',
//       border: '1px #b3b2ba solid',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//     }}
//   >

//     <HiOutlineDeviceMobile
//       color="#898890"
//       size="15px"
//     />

//   </Box>

//   {/* Label */}
//   <Typography
//     sx={{
//       fontSize: '14px',
//       color: "#333040",
//     }}
//   >
//     Mobile App
//   </Typography>

// </Box>