import { configureStore } from "@reduxjs/toolkit";
// import undoable from 'redux-undo';

import companyDashboardSlice from "./redux-slices/company-dashboard";
import fleetManagementSlice  from "./redux-slices/fleet-management";
import userSlice             from "./redux-slices/user";
import vehicleDashboardSlice from "./redux-slices/vehicle-dashboard";
import NewOrderSlice         from "./redux-slices/new-order";

const store = configureStore({
  reducer: {
    companyDashboard: companyDashboardSlice,
    user: userSlice,
    fleetManagement: fleetManagementSlice,
    vehicleDashboard: vehicleDashboardSlice,
    newOrder: NewOrderSlice,
  },
});

export {store};