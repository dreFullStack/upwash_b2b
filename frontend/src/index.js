import React, {useEffect} from 'react';
import reportWebVitals from './reportWebVitals';

// Pages
import Login            from './components/pages/login';
import CompanyDashboard from './components/pages/company-dashboard';
import Test             from './components/pages/test';

// React Router
import {
  Navigate,
  Outlet,
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import { createRoot } from 'react-dom/client';

import './index.css';

// State management
import {Provider} from "react-redux";
import {store}    from "./store";
import {useSelector} from "react-redux";
import {setUser}     from "./redux-slices/user";

// Company dashboard nested routes
import Profile          from './components/pages/company-dashboard/tabs/Profile';
import Overview         from './components/pages/company-dashboard/tabs/Overview';
import FleetsManagement from './components/pages/company-dashboard/tabs/FleetsManagement';

import NewFleet         from './components/pages/company-dashboard/tabs/NewFleet';
import NewVehicle       from './components/pages/company-dashboard/tabs/NewVehicle';
import EditVehicle      from './components/pages/company-dashboard/tabs/EditVehicle';
import BulkImport       from './components/pages/company-dashboard/tabs/BulkImport';
import VehicleDashboard from './components/pages/company-dashboard/tabs/VehicleDashboard';
import NewOrder         from './components/pages/company-dashboard/tabs/NewOrder';
import Invoices         from './components/pages/company-dashboard/tabs/Invoices';
import Support          from './components/pages/company-dashboard/tabs/Support';
import Orders           from './components/pages/company-dashboard/tabs/Orders';

// Axios
import axios from 'axios';


const ProtectedRoute = ({
  isAllowed,
  redirectPath = '/landing',
  children,
}) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

// TODO: Move this to a separate module
// NOTE: we can also use redux-persist to hydrate the store
const hydrateUser = () => {
  const user = JSON.parse(window.localStorage.getItem('user'));

  if (user) {
    store.dispatch(setUser(user));
  }
};

const App = () => {

  // TODO: this is a hack to hydrate the store
  // Find a better way to hydrate the store!!!
  hydrateUser();
  
  const user = useSelector((state) => state.user);
  console.log('App; user -> ', user);

  // Set axios default headers
  const accessToken = localStorage.getItem('accessToken');
  axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

  // Register axios interceptor to redirect to login page if the user is not authenticated
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log("axios.interceptors.response; error -> ", error);

      if (error?.response?.status === 401) {
        console.log("axios.interceptors.response; error.response.status === 401");
        
        window.localStorage.removeItem('user');
        window.localStorage.removeItem('accessToken');
        window.localStorage.removeItem('refreshToken');

        window.location.href = '/login';
      }

      return Promise.reject(error);
    }
  );

  // Get new pairs of tokens every 30 seconds
  useEffect(() => {

    // TODO: this is temporary solution
    const interval = setInterval(

      async () => {

        try{

          const refreshToken = localStorage.getItem('refreshToken');
          
          const res = await axios.post('http://localhost:5000/api/v1/auth/refreshToken', {
            refreshToken: refreshToken
          });

          const newRefreshToken = res.data.refreshToken;
          const newAccessToken  = res.data.accessToken;

          localStorage.setItem('refreshToken', newRefreshToken);
          localStorage.setItem('accessToken', newAccessToken);

          // console.log("New pair of tokens: ", newRefreshToken, newAccessToken);

        }
        catch(err){

          console.error("An error occured while requesting new pair of tokens: ", err);

        }

      }, 3000);

      return () => clearInterval(interval);

  }, []);

  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
            <Route 
              path="/company-dashboard" 
              element={
                <ProtectedRoute 
                  isAllowed={user?.isLoggedIn} 
                  redirectPath="/login"
                >
                  <CompanyDashboard />
                </ProtectedRoute>
              } 
            >
              <Route path="overview" element={<Overview />} />
              <Route path="profile" element={<Profile />} />
              <Route path="fleets-management" element={<FleetsManagement />} />
              
              <Route path="new-fleet" element={<NewFleet />} />
              <Route path="new-vehicle" element={<NewVehicle />} />
              <Route path="edit-vehicle" element={<EditVehicle />} />
              <Route path="bulk-import" element={<BulkImport />} />
              <Route path="vehicle-dashboard" element={<VehicleDashboard />} />
              <Route path="new-order" element={<NewOrder />} />
              
              <Route path="orders" element={<Orders />} />
              <Route path="invoices" element={<Invoices />} />
              <Route path="support" element={<Support />} />
            </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/test"  element={<Test />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
};

const root = document.getElementById('root');

createRoot(root).render(
  <Provider store={store}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
