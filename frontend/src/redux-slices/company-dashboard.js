import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  fleetManagerInfo: { },
  companyInfo: { },
  fleets: [],
  vehiclesCategories: [],
}

export const companyDashboardSlice = createSlice({
  name: 'companyDashboard',
  initialState,
  reducers: {
    setCompanyInfo: (state, action) => {
      state.companyInfo = action.payload;
    },
    setFleetManagerInfo: (state, action) => {
        state.fleetManagerInfo = action.payload;
    },
    setFleetsInfo: (state, action) => {
      state.fleets = action.payload;
    },
    setVehiclesCategories: (state, action) => {
      state.vehiclesCategories = action.payload;
    }
  },
});

const { actions, reducer } = companyDashboardSlice;

export const { 
  setCompanyInfo, 
  setFleetManagerInfo,
  setFleetsInfo,
  setVehiclesCategories
} = actions;

export default reducer;